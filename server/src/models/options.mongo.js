const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
      },
      options: [
        {
          label: {
            type: String,
            required: true,
          },
          url: String, // Assuming url is optional
          options: [
            // Recursive definition for nested options
            {
              label: {
                type: String,
                required: true,
              },
              url: String, // Assuming url is optional

              // ... other properties
            },
          ],
        },
      ],
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
