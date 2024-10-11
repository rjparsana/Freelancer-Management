const express = require('express');
const Payment = require('../models/paymentModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// Create a new payment
router.post('/payment', authMiddleware, async (req, res) => {
    const { amount, status, projectId } = req.body;

    try {
        const payment = new Payment({ amount, status, projectId });
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

module.exports = router;


// Mark payment as paid
router.post('/:id/pay', authMiddleware, async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    payment.status = 'paid';
    await payment.save();
    res.json(payment);
});

module.exports = router;
