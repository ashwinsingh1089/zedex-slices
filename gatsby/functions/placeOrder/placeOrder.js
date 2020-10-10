// cannot use import syntax
const nodemailer = require('nodemailer');

function generateOrderEmail({order, total}){
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <ul>
        ${order.map(item => `<li>
          <img  src="${item.thumbnail}" alt={item.name} />
          ${item.name} ${item.size}
        </li>`)}
      </ul>
    </div>
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIN_PASSWORD,
  },
});

async function wait(ms){
  return new Promise((resolve, reject)=>{
    setTimeout(resolve, ms);
  })
}

exports.handler = async (event, context) => {
  await wait(5000);
  const requiredFields = ['name','email','order'];
  const body = JSON.parse(event.body);
  for (const field of requiredFields){
    if(!body[field]){
      return {
        statusCode: 400,
        body: JSON.stringify({message: `Oops, you are missing the ${field} field!`})
      }
    }
  }


  const info = await transporter.sendMail({
    from: "Slick's slices <slick@example.com>",
    to: ` ${body.name} <${body.email}>`,
    subject: 'New Order!!',
    html: generateOrderEmail(body.order, body.total),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Success'}),
  };
};
