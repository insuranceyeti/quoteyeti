import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Terms and Conditions | QuoteYeti",
  description: "QuoteYeti terms of use and conditions for using our insurance quote services.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">QuoteYeti Terms</h1>
            <p className="text-muted-foreground mb-8">Last Updated on September 23, 2024</p>

            <div className="prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Terms of Use</h2>
                <p className="text-muted-foreground mb-4">
                  The following terms and conditions (the &quot;Terms of Use&quot;) govern your use of the services offered through QuoteYeti (collectively, the &quot;Site&quot;). This site is owned by Insurance Yeti LLC. By using the Site, including requesting quotes for insurance, by calling our toll-free number, initiating a request for us to contact you by telephone, signing up to receive news and information by providing your email address, or any other means we might make available, you accept and agree to these Terms of Use. If you do not agree to these Terms of Use, you are prohibited from using or accessing the Site. The terms &quot;we,&quot; or &quot;us,&quot; refer to Insurance Yeti, LLC and its subsidiaries and affiliates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Applicability to Lead Buyers</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms of Use apply to all users of the Site, including individual consumers and third-party businesses or entities that access the Site for the purpose of purchasing or receiving leads, data, or marketing services (&quot;Lead Buyers&quot;). By using the Site or engaging in transactions involving leads, you agree to be bound by these Terms of Use in full.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Our Service</h2>
                <p className="text-muted-foreground mb-4">
                  QuoteYeti provides users the opportunity to obtain quotes from insurance carriers and other service providers. Once you provide us with certain information regarding your insurance needs, we attempt to match you with appropriate offerings and provide links to further information or to apply for coverage. While we publish content on the Site about insurance, we do not provide tax or financial advice of any kind. We do not guarantee that any policy for which you apply will be approved, or that any insurance carrier or other service provider to which we link will review your application or contact you. We are not responsible in any way for the conduct of the insurance carriers and other companies whose products may be displayed on the Site. The policy provided by any insurance provider will be subject to the terms and conditions under which it is issued, and we have no control over such terms and conditions. While we make every attempt to publish current information regarding a variety of insurance offerings, such information is presented without guarantee or warranty. After selecting a link to an insurance carrier or other service provider, you will be taken to such party&apos;s site where you can review the applicable terms and conditions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Accessing our Site</h2>
                <p className="text-muted-foreground mb-4">
                  You may only use the Site if you live in the United States and are at least 14 years old. We reserve the right, for any reason, in our sole discretion, to terminate, change, suspend or discontinue any aspect of the Site. We may also impose limits on certain features of the Site or restrict your access to part of or the entire Site, without notice or penalty. We do not charge users for use of the Site. We may be compensated by insurance carriers or other companies advertising on the Site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">User Data; Consent to Contact</h2>
                <p className="text-muted-foreground mb-4">
                  In the course of your use of the Site, you may be asked to provide information or materials to us (&quot;User Data&quot;). User Data includes, for example, information you submit to us via your request for insurance quotes. Our information collection and use practices with respect to User Data are set forth in our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> which is incorporated herein by reference for all purposes. Please read our Privacy Policy before submitting any User Data. You acknowledge and agree that you are solely responsible for the accuracy and content of the User Data. We cannot be responsible for maintaining any User Data that you provide to us, and we may delete or destroy any such User Data at any time. We reserve the right to refuse to post or to remove any User Data, in whole or in part, that, in our sole discretion, is unlawful, unacceptable, undesirable, inappropriate or in violation of these Terms of Use.
                </p>
                <p className="text-muted-foreground mb-4">
                  By providing your contact information to us through the Site, you are registering to receive communications from us directly, on our website or through a third party. We will periodically send you newsletters and other emails with offers and promotions. We may also contact you by telephone using an automated dialing system along with a pre-recorded message or interactive voice response system. If you no longer wish to receive these communications, please let us know by sending an email to Customer Care at wes@insuranceyeti.com. You may also opt-out by clicking on the unsubscribe link in our emails.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Exclusive Ownership of Rights</h2>
                <p className="text-muted-foreground mb-4">
                  The Site and any necessary software used in connection with the Site contain proprietary and confidential information that is protected by intellectual property laws in applicable jurisdictions. You acknowledge and agree that information and materials presented through the Site is protected by copyrights, trademarks, service marks, patents or other proprietary rights and laws. Except as expressly permitted by applicable law or as authorized by us, you agree not to modify, sell, distribute, transmit, broadcast, publicly perform or create derivative works based on the Site, in whole or in part. Any commercial use of the Site, or any portion thereof, by you is strictly prohibited.
                </p>
                <p className="text-muted-foreground mb-4">
                  Insurance Yeti, LLC grants you a personal, non-transferable and non-exclusive right and license to use the Site on a computer or other Internet device; provided that you do not (and do not allow any third party to) copy, reproduce, distribute, reverse engineer or otherwise exploit any content, code, data or materials on the Site. You agree not to modify the Site in any manner or form, nor to use modified versions of the Site for any purpose. We do not grant any license or other authorization to any user to use our trade names, trademarks, service marks or other marks or logos or those of our partners without our separate express written agreement. Third party marks are the property of their respective owners.
                </p>
                <p className="text-muted-foreground mb-4">
                  Any questions, comments, suggestions, or materials submitted to us through the Site will become our sole property. We will own all rights in such materials, and have the unrestricted right to use, publish and otherwise disseminate such information for any purpose, without attribution or compensation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">DISCLAIMER OF WARRANTIES</h2>
                <p className="text-muted-foreground mb-4">
                  The information and services on this Site are provided &quot;as is&quot; and for informational purposes only. We make no representations or warranties that the Site will be suitable for your needs, is complete, timely, reliable, or free from errors, inaccuracies or typographical mistakes. We disclaim all warranties, express or implied, including warranties of merchantability or fitness for a particular purpose or non-infringement of the rights of others. We do not warrant that the Site will be free of errors or viruses, worms or other destructive or harmful code.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">LIMITATION OF LIABILITY</h2>
                <p className="text-muted-foreground mb-4 uppercase text-xs">
                  IN NO EVENT SHALL INSURANCE YETI, LLC, ANY OF OUR DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AFFILIATES, OR CONTENT OR SERVICE PROVIDERS (COLLECTIVELY, THE &quot;PROTECTED ENTITIES&quot;) BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES ARISING FROM, OR DIRECTLY OR INDIRECTLY RELATED TO, THE USE OF, OR THE INABILITY TO USE, THE SITE AND THE SERVICES OFFERED HEREBY, OR THE CONTENT, MATERIALS AND FUNCTIONS RELATED THERETO, INCLUDING, WITHOUT LIMITATION, LOSS OF REVENUE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION (WHETHER IN CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, OR OTHERWISE) EXCEED FIVE DOLLARS ($5.00). THE ABOVE LIMITATION MAY NOT APPLY IN ALL JURISDICTIONS OR TO ALL USERS. IF YOU ARE NOT IN AGREEMENT WITH THE FOREGOING, YOUR SOLE REMEDY IS TO TERMINATE THIS AGREEMENT AND DISCONTINUE USE OF THE SITE.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Links from our Site</h2>
                <p className="text-muted-foreground mb-4">
                  We accept advertising from and provide links to other sites for informational purposes only. We have no responsibility for the accuracy or availability of information provided by other sites to which you may link from the Site. The availability of these links does not constitute an endorsement of or association with such sites or the content, products, advertising or other materials presented on such sites. You acknowledge and agree that we are not responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with your use of or reliance on any content, goods or services available on such sites. You further acknowledge that we have no control over, and we assume no responsibility for, the content, privacy policies, or practices of any third party sites and third party content contained on the Site, to which the Site is linked, or on which Site Content is posted.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Updates</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms of Use are subject to change from time to time and at any time, and such changes will be effective upon posting to the Site. Use of the Site following any modifications to the Terms of Use signifies your acceptance of such modifications.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Agreement to Arbitrate</h2>
                <p className="text-muted-foreground mb-4">
                  By using the Site, you agree that any dispute or claim relating in any way to your use of the Site, including but not limited to any services or information you receive through the Site, will be resolved by binding arbitration, rather than in court, except that you may assert claims in small claims court if your claims qualify.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Scope</h2>
                <p className="text-muted-foreground mb-4">
                  This agreement to arbitrate applies not only to claims against Insurance Yeti, LLC but also to any of our partners, affiliates, marketing partners, service providers, and any other parties linked through our platform (collectively, &quot;Partner Entities&quot;). This ensures that all parties involved in the delivery, marketing, or fulfillment of services through the Site are protected by and benefit from this arbitration provision.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Arbitration Rules and Forum</h2>
                <p className="text-muted-foreground mb-4">
                  The arbitration will be conducted by a neutral arbitrator through the American Arbitration Association (&quot;AAA&quot;) under its rules, including the AAA Consumer Arbitration Rules. The AAA&apos;s rules are available at www.adr.org or by calling 1-800-778-7879. To begin an arbitration proceeding, you must send a letter requesting arbitration and describing your claim to: Insurance Yeti, LLC, 476 Riverside Ave Jacksonville FL 32202.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Fees and Costs</h2>
                <p className="text-muted-foreground mb-4">
                  The payment of all filing, administration and arbitrator fees will be governed by the AAA&apos;s rules. We will reimburse such fees for claims totaling less than $10,000 unless the arbitrator determines the claims are frivolous. Likewise, we will not seek attorneys&apos; fees and costs in arbitration unless the arbitrator determines your claim is frivolous.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">No Class Actions</h2>
                <p className="text-muted-foreground mb-4 uppercase text-xs">
                  YOU AND INSURANCE YETI, LLC (INCLUDING OUR PARTNER ENTITIES) AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Opt-Out</h2>
                <p className="text-muted-foreground mb-4">
                  You may opt out of this arbitration provision by sending written notice of your decision to opt out to: Insurance Yeti, LLC, 476 Riverside Ave Jacksonville FL 32202, within 30 days of your first use of the Site. If you opt out, we will also not be bound by this arbitration provision.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Applicable Laws</h2>
                <p className="text-muted-foreground mb-4">
                  The Site and these Terms of Use are governed by the laws of the State of California without giving effect to any principles of conflict of laws. If any provision of these Terms of Use shall be held to be invalid, illegal or unenforceable, the remaining provisions shall not in any way be affected or impaired thereby. Any dispute arising from your use of this Site shall be brought exclusively in the appropriate state or federal courts of the State of California. Persons who choose to access this Site from other locations do so on their own initiative, and are responsible for compliance with local laws, if and to the extent local laws are applicable. Regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Site or the Terms of Use must be filed within one (1) year after such claim or cause of action arose or be forever barred.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
