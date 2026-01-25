
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const StaticPageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-brand-accent hover:text-brand-accent-hover font-semibold">
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Link>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">{title}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none text-brand-secondary prose-h2:font-bold prose-h2:tracking-tighter prose-h2:text-brand-dark dark:prose-h2:text-brand-light">
        {children}
      </div>
    </motion.div>
  );
};

export const PrivacyPolicyPage: React.FC = () => (
  <StaticPageLayout title="Privacy Policy">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <p>
      Xs Technologies Inc. ("us", "we", or "our") operates the Xs mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
    </p>
    <h2>Information Collection and Use</h2>
    <p>
      We collect several different types of information for various purposes to provide and improve our Service to you. This may include your name, email address, location data for finding parking, and payment information for bookings.
    </p>
    <h2>Location Data</h2>
    <p>
      We use your location data to show you nearby parking spots and to provide navigation. You can enable or disable location services when you use our Service at any time through your mobile device settings.
    </p>
    <h2>Security of Data</h2>
    <p>
      The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
    </p>
  </StaticPageLayout>
);

export const TermsOfServicePage: React.FC = () => (
  <StaticPageLayout title="Terms of Service">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <p>
      Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Xs mobile application (the "Service") operated by Xs Technologies Inc. ("us", "we", or "our").
    </p>
    <h2>Bookings</h2>
    <p>
      By making a booking through our Service, you warrant that you are legally capable of entering into binding contracts. Bookings are subject to availability and the terms and conditions of the individual parking lot operators.
    </p>
    <h2>Cancellations and Refunds</h2>
    <p>
      Cancellation policies vary by parking location. The specific policy applicable to your booking will be made available to you at the time of booking. We are not responsible for refunds for services rendered by the parking operators.
    </p>
    <h2>Limitation of Liability</h2>
    <p>
      In no event shall Xs Technologies Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
    </p>
  </StaticPageLayout>
);

export const ContactPage: React.FC = () => (
  <StaticPageLayout title="Contact Us">
    <p>If you have any questions about our Service, or need help with a booking, please don't hesitate to reach out. We're here to help!</p>
    <div className="mt-8 space-y-4">
        <div>
            <h2 className="text-2xl">Email Support</h2>
            <a href="mailto:support@xs-parking.app" className="text-brand-accent hover:underline">support@xs-parking.app</a>
            <p>We aim to respond to all queries within 24 hours.</p>
        </div>
        <div>
            <h2 className="text-2xl">Press Inquiries</h2>
            <a href="mailto:press@xs-parking.app" className="text-brand-accent hover:underline">press@xs-parking.app</a>
        </div>
        <div>
            <h2 className="text-2xl">Corporate Office</h2>
            <p>123 Dharma Lane, Moksha City, Bharat 10001</p>
        </div>
    </div>
  </StaticPageLayout>
);

export const DeleteAccountPage: React.FC = () => (
  <StaticPageLayout title="Delete Your Account">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <p>
      At <strong>Xs</strong> (operated by Xs Technologies Inc.), we respect your right to control your personal data. This page explains how you can delete your account and what happens to your data when you do.
    </p>
    
    <h2>How to Delete Your Account</h2>
    <p>
      You can delete your Xs account in two ways:
    </p>
    <ul>
      <li>
        <strong>Within the App:</strong> Open the Xs mobile application, navigate to Settings, and select "Delete Account". Follow the prompts to confirm your deletion request.
      </li>
      <li>
        <strong>Via Email:</strong> Send a deletion request to <a href="mailto:support@xs-parking.app" className="text-brand-accent hover:underline">support@xs-parking.app</a> from the email address associated with your account. Include "Account Deletion Request" in the subject line and your account email address in the body.
      </li>
    </ul>
    <p>
      Once you submit a deletion request, we will process it within 30 days. You will receive a confirmation email when your account has been deleted.
    </p>

    <h2>What Data is Deleted</h2>
    <p>
      When you delete your Xs account, we will permanently delete the following information:
    </p>
    <ul>
      <li>Your account profile information (name, email address, phone number)</li>
      <li>Your saved payment methods and payment preferences</li>
      <li>Your booking history and reservation details</li>
      <li>Your location preferences and saved parking locations</li>
      <li>Your app settings and preferences</li>
      <li>Any other personal data associated with your account</li>
    </ul>

    <h2>Data Retention Period</h2>
    <p>
      Please note that certain information may be retained for legal and regulatory purposes:
    </p>
    <ul>
      <li>
        <strong>Payment Records:</strong> Transaction records, payment receipts, and financial data related to completed bookings are retained for a period of 7 years as required by tax and financial regulations. This includes anonymized transaction data that cannot be linked back to your personal account.
      </li>
      <li>
        <strong>Legal Obligations:</strong> We may retain certain information if required by law, court order, or to resolve disputes, prevent fraud, or enforce our Terms of Service.
      </li>
      <li>
        <strong>Aggregated Data:</strong> We may retain anonymized, aggregated data that cannot identify you personally. This data is used for analytics and service improvement purposes.
      </li>
    </ul>
    <p>
      After the retention period expires, all retained data will be permanently deleted from our systems.
    </p>

    <h2>Important Considerations</h2>
    <p>
      Before deleting your account, please be aware that:
    </p>
    <ul>
      <li>You will lose access to all your booking history and receipts</li>
      <li>Any active or upcoming bookings may be affected</li>
      <li>You will need to create a new account if you wish to use Xs again in the future</li>
      <li>This action cannot be undone once completed</li>
    </ul>

    <h2>Questions or Concerns</h2>
    <p>
      If you have any questions about account deletion or need assistance with the process, please contact us at <a href="mailto:support@xs-parking.app" className="text-brand-accent hover:underline">support@xs-parking.app</a>. We're here to help.
    </p>
  </StaticPageLayout>
);

export const TermsOfUsePage: React.FC = () => (
  <StaticPageLayout title="Terms of Use">
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    
    <p>
      This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
    </p>
    
    <p>
      This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name <a href="https://xs-parking.com/" className="text-brand-accent hover:underline">https://xs-parking.com/</a> ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
    </p>
    
    <p>
      The Platform is owned by 8950066821, a company incorporated under the Companies Act, 1956 with its registered office at B-35 Ansal Town, Rewari, Haryana, Pin code 123401 (hereinafter referred to as 'Platform Owner', 'we', 'us', 'our').
    </p>
    
    <p>
      Your use of the Platform and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by You which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
    </p>
    
    <p>
      For the purpose of these Terms of Use, wherever the context so requires 'you', 'your' or 'user' shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.
    </p>
    
    <p>
      <strong>ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.</strong>
    </p>
    
    <h2>Terms of Use</h2>
    <p>
      The use of Platform and/or availing of our Services is subject to the following Terms of Use:
    </p>
    
    <ol>
      <li>
        <p>
          To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.
        </p>
      </li>
      <li>
        <p>
          Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
        </p>
      </li>
      <li>
        <p>
          Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.
        </p>
      </li>
      <li>
        <p>
          The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents includes and is not limited to the design, layout, look and graphics.
        </p>
      </li>
      <li>
        <p>
          You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.
        </p>
      </li>
      <li>
        <p>
          You agree to pay us the charges associated with availing the Services.
        </p>
      </li>
      <li>
        <p>
          You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
        </p>
      </li>
      <li>
        <p>
          You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. These links are provided for your convenience for provide further information.
        </p>
      </li>
      <li>
        <p>
          You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.
        </p>
      </li>
      <li>
        <p>
          You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.
        </p>
      </li>
      <li>
        <p>
          Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
        </p>
      </li>
    </ol>
    
    <h2>Governing Law and Jurisdiction</h2>
    <p>
      These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
    </p>
    
    <p>
      All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Rewari and Haryana.
    </p>
    
    <h2>Contact Information</h2>
    <p>
      All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
    </p>
  </StaticPageLayout>
);
