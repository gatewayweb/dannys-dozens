import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const { cart, customer } = req.body;
  let orderItems = 'No items in order.';
  let customerInfo = '';

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!cart || !customer || !customer.email || customer.email === '' || !mailformat.test(customer.email)) {
    res.status(500).json({ error: 'Invalid email' });
  }

  if (typeof cart !== 'undefined' && cart && cart.length) {
    orderItems = '';
    cart.forEach((cartItem) => {
      const { item, size, quantity } = cartItem;
      orderItems += `
        <tr>
          <td style="padding-top:12px;"><strong>${item.name} (${size})</strong></td>
        </tr>
        <tr>
          <td colspan="2" style="padding-bottom:12px;border-bottom:2px solid #ccc;">Quantity: ${quantity}</td>
        </tr>`;
    });
  }

  const setCustomerRow = (label, val) => {
    if (val) {
      customerInfo += `
        <tr>
          <td style="padding-top:12px;padding-bottom:12px;border-bottom:2px solid #ccc;"><strong>${label}:</strong> ${val}</td>
        </tr>
      `;
    }
  };

  setCustomerRow('Name', customer?.name);
  setCustomerRow('Email', customer?.email);
  setCustomerRow('Phone', customer?.phone);

  const emailData = {
    to: ['dannysdozens@gmail.com', customer.email],
    from: 'order@dannysdozens.com',
    subject: 'Online Order',
    name: 'Dannys Dozens',
    html: `
      <h1>Cookie Order</h1>
      <table width="100%" style="width:100%;" cellspacing="0">
        ${customerInfo}
        ${orderItems}
        <tr>
          <td style="padding-top:12px;padding-bottom:12px;border-bottom:2px solid #ccc;">
            <h2>Payment via Venmo</h2>
            Please text my phone (508) 942-4976 for payment instructions.
          </td>
        </tr>
        <tr>
          <td style="padding-top:12px;padding-bottom:12px;border-bottom:2px solid #ccc;">
            <strong>Payment Instructions:</strong>
            Payment for orders must be sent in within 24 hours upon placing order. Please mark the memo as "Reimbursement for food". Thanks!
          </td>
        </tr>
        <tr>
          <td style="padding-top:12px;padding-bottom:12px;border-bottom:2px solid #ccc;">
            <strong>Pickup & Delivery:</strong>
            Baking is done once a week. Orders placed by noon on Saturdays will be baked and ready for pickup or delivery Sunday evenings.
          </td>
        </tr>
      </table>`,
  };

  try {
    await sgMail.sendMultiple(emailData);
    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};
