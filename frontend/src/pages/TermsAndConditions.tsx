import { FaRegHandshake, FaRegBuilding, FaRegFileAlt, FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

function TermsAndConditions() {
  return (
    <div className="container mx-auto px-8 py-12">
        <Link to='/' className=" text-gray-500">Back</Link>
      <h1 className="text-5xl font-bold mb-10">Terms & Conditions</h1>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Introduction</h2>
        <p className="text-xl mb-4">
          Welcome to Yogvan Holiday Apartments! By accessing, viewing, or using our website or services, you agree to comply with these terms and conditions. Please read them carefully.
        </p>
        <p className="text-xl">
          These terms and conditions govern your use of our website and services. They may be updated from time to time, and by continuing to use our services after any changes, you accept and agree to the updated terms.
        </p>
      </section>

      {/* Section 1: Use Of Website */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">1. Use Of Website</h2>
        <p className="text-xl mb-4">
          Our website is intended for personal, non-commercial use only. By using our website, you agree to abide by these terms and conditions, including our policies on privacy and data security.
        </p>
        <div className="flex items-center text-xl mb-2">
          <FaRegBuilding className="mr-2" />
          <span>Commercial use is strictly prohibited without prior written consent.</span>
        </div>
        <div className="flex items-center text-xl">
          <FaRegHandshake className="mr-2" />
          <span>You are responsible for maintaining the secrecy of your account information.</span>
        </div>
      </section>

      {/* Section 2: Proprietary Rights Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">2. Proprietary Rights Information</h2>
        <p className="text-xl mb-4">
          Our website contains proprietary information, trademarks, and intellectual property owned by Yogvan Holiday Apartments. Unauthorized use or reproduction of any materials is strictly prohibited.
        </p>
        <div className="flex items-center text-xl">
          <FaRegFileAlt className="mr-2" />
          <span>No part of our website or materials may be modified, reproduced, or distributed without prior written consent.</span>
        </div>
      </section>

      {/* Section 3: Restrictions On Use Of Materials */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">3. Restrictions On Use Of Materials</h2>
        <p className="text-xl mb-4">
          All materials on our website are protected by copyright and intellectual property laws. You may only use these materials for personal, non-commercial purposes.
        </p>
        <p className="text-xl">
          Unauthorized copying, reproduction, or distribution of materials is strictly prohibited.
        </p>
      </section>

      {/* Section 4: Submissions */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">4. Submissions</h2>
        <p className="text-xl mb-4">
          Any submissions, feedback, or suggestions you provide to us through our website become our exclusive property. By submitting content, you grant us the right to use it for any purpose without compensation.
        </p>
        <p className="text-xl">
          You agree not to submit any content that infringes upon the rights of third parties.
        </p>
      </section>

      {/* Section 5: Promotional Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">5. Promotional Information</h2>
        <p className="text-xl mb-4">
          From time to time, we may offer promotions or special offers on our website. These promotions are subject to specific terms and conditions listed on our site.
        </p>
        <p className="text-xl">
          We reserve the right to alter or withdraw any promotion at any time.
        </p>
      </section>

      {/* Section 6: Links */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">6. Links</h2>
        <p className="text-xl mb-4">
          Our website may contain links to third-party websites. We are not responsible for the content or reliability of these websites.
        </p>
        <p className="text-xl">
          You use these links at your own risk, and we disclaim any liability for damages arising from your use of third-party websites.
        </p>
      </section>

      {/* Section 7: Access And Interference */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">7. Access And Interference</h2>
        <p className="text-xl mb-4">
          You agree not to use any automated tools or devices to interfere with the operation of our website or services.
        </p>
        <p className="text-xl">
          You also agree not to copy, reproduce, or modify any content on our website without our prior written consent.
        </p>
      </section>

      {/* Section 8: Limitation Of Liability */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">8. Limitation Of Liability</h2>
        <p className="text-xl mb-4">
          We will not be liable for any direct, indirect, or consequential damages arising from your use of our website or services.
        </p>
        <p className="text-xl">
          Our liability is limited to the maximum extent permitted by law.
        </p>
      </section>

      {/* Section 9: Disclaimers */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">9. Disclaimers</h2>
        <p className="text-xl mb-4">
          Our website and services are provided on an "as is" and "as available" basis without warranties of any kind.
        </p>
        <p className="text-xl">
          We disclaim all warranties, express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose.
        </p>
      </section>

      {/* Section 10: Governing Law & Jurisdiction */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">10. Governing Law & Jurisdiction</h2>
        <p className="text-xl mb-4">
          These terms and conditions are governed by the laws of India, and any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts of Delhi.
        </p>
      </section>

      {/* Section 11: Indemnification */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">11. Indemnification</h2>
        <p className="text-xl mb-4">
          You agree to indemnify and hold Yogvan Holiday Apartments and its affiliates harmless from any claims or demands arising from your use of our website or services.
        </p>
      </section>

      {/* Section 12: Termination */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">12. Termination</h2>
        <p className="text-xl mb-4">
          These terms and conditions are effective until terminated by either party. You may terminate these terms by discontinuing your use of our website.
        </p>
        <p className="text-xl">
          We reserve the right to terminate your access to our website at any time without notice if you violate these terms.
        </p>
      </section>

      {/* Section 13: General */}
      <section>
        <h2 className="text-3xl font-bold mb-6">13. General</h2>
        <p className="text-xl mb-4">
          These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you and Yogvan Holiday Apartments regarding your use of our website and services.
        </p>
        <p className="text-xl">
          If any provision of these terms is deemed invalid or unenforceable, it shall be severed from the rest of the terms, which shall remain in full force and effect.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Questions?</h2>
        <p className="text-xl mb-4">
          If you have any questions or concerns about these terms and conditions, please contact us at support@yogvanholidays.com.
        </p>
        <div className="flex items-center text-xl">
          <FaRegPaperPlane className="mr-2" />
          <span>We're here to help!</span>
        </div>
      </section>
    </div>
  );
}

export default TermsAndConditions;
