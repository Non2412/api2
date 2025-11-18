import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/model/Order';
import Customer from '@/lib/model/Customer';
import Product from '@/lib/model/Product';

// Calculate shipping cost based on quantity
function calculateShippingCost(quantity) {
  if (quantity === 0) return 0;
  // First item: 50 baht, each additional item: 10 baht
  return 50 + (quantity - 1) * 10;
}

// Generate unique order number
async function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const count = await Order.countDocuments();
  const sequenceNumber = String(count + 1).padStart(5, '0');
  return `ORD-${year}${month}${day}-${sequenceNumber}`;
}

export async function GET(request) {
  try {
    await connectDB();
    
    // Support filtering by status, customerId, and pagination
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status) filter.status = status;
    if (customerId) filter.customerId = customerId;

    const orders = await Order.find(filter)
      .populate('customerId')
      .populate('items.productId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate customer
    const customer = await Customer.findById(body.customerId);
    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: 'Customer not found',
        },
        { status: 404 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    let totalQuantity = 0;

    for (const item of body.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product ${item.productId} not found`,
          },
          { status: 404 }
        );
      }
      subtotal += item.quantity * item.price;
      totalQuantity += item.quantity;
    }

    const shippingCost = calculateShippingCost(totalQuantity);
    const totalPrice = subtotal + shippingCost;

    // Generate order number
    const orderNumber = await generateOrderNumber();

    const orderData = {
      ...body,
      orderNumber,
      subtotal,
      totalQuantity,
      shippingCost,
      totalPrice,
    };

    const order = await Order.create(orderData);

    // Update customer stats
    await Customer.findByIdAndUpdate(
      body.customerId,
      {
        $inc: { totalOrders: 1, totalSpent: totalPrice },
      }
    );

    // Update product sold count
    for (const item of body.items) {
      await Product.updateOne(
        { _id: item.productId, 'sizes.size': item.size },
        { $inc: { 'sizes.$.sold': item.quantity } }
      );
    }

    const populatedOrder = await order.populate('customerId').populate('items.productId');

    return NextResponse.json(
      {
        success: true,
        data: populatedOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}
