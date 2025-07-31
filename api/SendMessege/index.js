module.exports = async function (context, req) {
    // Get the data from the form submission
    const { name, email, message } = req.body;

    // Basic validation to ensure all fields are filled
    if (!name || !email || !message) {
        context.res = {
            status: 400,
            body: "Please provide all required fields."
        };
        return;
    }

    // Use the SendGrid output binding to create the email message
    context.bindings.message = {
        to: "your-email@example.com", // *** IMPORTANT: Change this to your email address
        from: "contact-form@your-website.com", // This can be any address, but a custom domain one is best
        subject: `New Contact Form Message from ${name}`,
        text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send a success response back to the browser
    context.res = {
        status: 200,
        body: "Thank you for your message! We will get back to you soon."
    };
};