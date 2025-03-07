import cron from 'node-cron';
import Subscription from '../models/subscriptionModel.js';

// Schedule to run every day at midnight
cron.schedule('0 0 * * *', async () => {  
  try {
    const currentDate = new Date();

    const subscriptionsToExpire = await Subscription.find({
      endDate: { $lt: currentDate },
      status: { $ne: 'expired' },
    });

    if (subscriptionsToExpire.length > 0) {
      const subscriptionIds = subscriptionsToExpire.map(sub => sub._id);

      await Subscription.updateMany(
        { _id: { $in: subscriptionIds } },
        { $set: { status: 'expired' } }
      );

      console.log(`Expired ${subscriptionsToExpire.length} subscriptions.`);
    }
  } catch (error) {
    console.error('Error expiring subscriptions:', error);
  }
});
