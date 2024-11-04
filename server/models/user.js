const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: /^\+8801\d{10}$/,
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zipCode: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    // orders: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order', // Assuming there's an Order model
    // }],
    // wishlist: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product', // Assuming there's a Product model
    // }],
    refreshToken: {
        type: String,
        default: null,
    },
});


module.exports = mongoose.model('User', UserSchema);
