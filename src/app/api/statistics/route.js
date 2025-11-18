import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/model/Order';
import Product from '@/lib/model/Product';
import Customer from '@/lib/model/Customer';

export async function GET(request) {
  try {
    await connectDB();

    // Total sales statistics
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    // Revenue calculation
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          totalSubtotal: { $sum: '$subtotal' },
          totalShipping: { $sum: '$shippingCost' },
          totalQuantity: { $sum: '$totalQuantity' },
          averageOrderValue: { $avg: '$totalPrice' },
        },
      },
    ]);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$totalPrice' },
        },
      },
    ]);

    // Size distribution
    const sizeDistribution = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.size',
          count: { $sum: '$items.quantity' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Payment method distribution
    const paymentMethods = await Order.aggregate([
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          totalValue: { $sum: '$totalPrice' },
        },
      },
    ]);

    // Top customers
    const topCustomers = await Customer.find()
      .sort({ totalSpent: -1 })
      .limit(10);

    const stats = {
      summary: {
        totalOrders,
        totalCustomers,
        totalRevenue: orderStats[0]?.totalRevenue || 0,
        totalSubtotal: orderStats[0]?.totalSubtotal || 0,
        totalShipping: orderStats[0]?.totalShipping || 0,
        totalQuantitySold: orderStats[0]?.totalQuantity || 0,
        averageOrderValue: orderStats[0]?.averageOrderValue || 0,
      },
      ordersByStatus,
      sizeDistribution,
      paymentMethods,
      topCustomers,
    };

    return NextResponse.json(
      {
        success: true,
        data: stats,
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
