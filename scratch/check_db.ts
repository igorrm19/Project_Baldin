import 'dotenv/config';
import connectDB from '../backEnd/src/config/DBconfig.js';
import User from '../backEnd/src/model/user.model.js';

async function check() {
    try {
        await connectDB();
        const count = await User.countDocuments();
        console.log('User count:', count);
        const users = await User.find().limit(5);
        console.log('Users:', users.map(u => ({ email: u.email, id: u._id })));

    } catch (err) {
        console.error(err);

    } finally {
        process.exit(0);
    }
}
check();
