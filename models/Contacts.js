const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model("Contacts", contactsSchema);