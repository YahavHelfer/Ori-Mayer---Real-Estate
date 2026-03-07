import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

const recipientEmail = 'orimayerealestate@gmail.com';

export default function CommunitySupportEnPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !email || !message) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Sending your message, please wait...');

    const formData = {
      name,
      phone,
      email,
      message,
      recipientEmail,
    };

    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!backendApiUrl) {
        setStatusMessage('Error: The server API URL is not configured.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${backendApiUrl}/api/send-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);

      if (response.ok) {
        const result = await response.json();
        setStatusMessage(result.message || 'Your inquiry was sent successfully. We will contact you soon.');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Unknown server communication error.' }));
        setStatusMessage(`Error sending inquiry: ${errorData.message || 'Please try again later.'}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error submitting community support English form:', error);
      setStatusMessage('Error sending inquiry. Please check your internet connection and try again.');
    }
  };

  return (
    <div dir="ltr" className="bg-gray-50">
      <Head>
        <title>Community Relocation Support for Jewish Families Moving to Israel | O.M Real Estate</title>
        <meta
          name="description"
          content="Professional real estate support for Jewish families making Aliyah to Israel, including area matching, property search, negotiation, and full relocation guidance."
        />
      </Head>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <div className="mb-4">
              <Link href="/community-support" className="text-custom-gold hover:underline">
                לעמוד בעברית
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-custom-black mb-5">
              Community Relocation Support for Jewish Families Making Aliyah to Israel
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              I support Jewish families from around the world throughout the Aliyah process and provide
              a full real-estate solution — from the initial planning stage to receiving the keys to
              their new home in Israel.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <h2 className="ui-h2 text-gray-900">What the process includes</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-6">
              <li>Precise mapping of needs, goals, and budget</li>
              <li>
                Matching the right area based on family profile, community, schools, and lifestyle
              </li>
              <li>Smart and focused property search and filtering</li>
              <li>Professional negotiation management</li>
              <li>
                Connection to a trusted team of experts: lawyers, mortgage advisors, tax specialists,
                appraisers, and other professionals as needed
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My goal is not only to find a property — but to help each family build a stable, secure,
              and financially sound foundation for their new chapter in Israel.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I believe Jewish communities around the world deserve one professional point of contact
              who can coordinate the full process, create certainty, and prevent costly mistakes.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="ui-card bg-white p-8 md:p-10">
            <h2 className="ui-h2 text-gray-900">Leave your details and we will get back to you</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              I would be happy to speak with you and explain how I can support community members
              throughout the Aliyah and settlement process in Israel.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="community-support-en-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  id="community-support-en-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <div>
                <label htmlFor="community-support-en-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="community-support-en-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <div>
                <label htmlFor="community-support-en-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="community-support-en-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="community-support-en-message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="community-support-en-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="block w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-custom-gold focus:border-custom-gold"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="ui-btn ui-btn-primary w-full">
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>

              {statusMessage && (
                <p
                  className={`text-sm text-center ${
                    statusMessage.includes('Error') ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
