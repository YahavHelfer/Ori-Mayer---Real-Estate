import React from 'react';
import Head from 'next/head';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <Head>
        <title>Privacy Policy - Ori Mayer Real Estate</title>
        <meta
          name="description"
          content="Privacy policy for Ori Mayer Real Estate, including information about data collection and usage."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        We are committed to protecting your privacy. This page explains what
        information we collect, how we use it, and how we protect it.
      </p>

      <h2 className="text-2xl font-bold mb-2">What We Collect</h2>
      <p className="mb-4">
        We may collect personal information that you provide through forms on
        the website, and basic usage data through cookies.
      </p>

      <h2 className="text-2xl font-bold mb-2">Why We Collect It</h2>
      <p className="mb-4">
        The information is used to improve the user experience, respond to
        inquiries, and provide relevant service communication.
      </p>

      <h2 className="text-2xl font-bold mb-2">Data Protection</h2>
      <p className="mb-4">
        We take reasonable measures to protect your data and do not share it
        with third parties without a valid reason.
      </p>

      <h2 className="text-2xl font-bold mb-2">Contact</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy, please contact us
        through the contact page on this website.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
