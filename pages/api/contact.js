import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const { cart, customer } = req.body;
  // const { email, subject, message, name } = req.body;
  let orderItems = 'No items in order.';
  let customerInfo = '';

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
    to: 'sambennett114@gmail.com',
    from: 'order@dannysdozens.com',
    subject: 'Online Order',
    name: 'Dannys Dozens',
    html: `
      <h1>Online Order</h1>
      <table width="100%" style="width:100%;" cellspacing="0">
        ${customerInfo}
        ${orderItems}
      </table>`,
  };

  try {
    await sgMail.send(emailData);
    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};
