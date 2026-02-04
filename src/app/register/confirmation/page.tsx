// src/app/register/confirmation/page.tsx
// UPDATED: Added detailed Georgia Promise Scholarship application instructions

'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, Clock, MapPin, User, DollarSign, Download, AlertTriangle, ExternalLink, CreditCard, CheckSquare } from 'lucide-react'

function ConfirmationPageContent() {
  const searchParams = useSearchParams()
  
  // Get data from payment
  const sessionDate = searchParams.get('sessionDate') || ''
  const sessionTime = searchParams.get('sessionTime') || ''
  const sessionLocation = searchParams.get('sessionLocation') || ''
  const studentName = searchParams.get('studentName') || ''
  const studentGrade = searchParams.get('studentGrade') || ''
  const promiseEligible = searchParams.get('promiseEligible') === 'true'
  const includeCurriculum = searchParams.get('includeCurriculum') === 'true'
  const amountPaid = parseFloat(searchParams.get('amountPaid') || '0')
  const balanceDue = parseFloat(searchParams.get('balanceDue') || '0')

  // Generate confirmation number
  const confirmationNumber = `RWFW-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas-light to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-evergreen mb-2">
            Registration Complete!
          </h1>
          <p className="text-xl text-gray-600">
            {studentName} is registered for the RootWork Framework Saturday Program
          </p>
          <div className="mt-4 inline-block bg-white px-6 py-3 rounded-full shadow-lg">
            <span className="text-sm text-gray-600">Confirmation Number: </span>
            <span className="font-mono font-bold text-evergreen">{confirmationNumber}</span>
          </div>
        </div>

        {/* Session Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-evergreen mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            Session Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-evergreen mt-1" />
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold text-gray-900">{sessionDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-evergreen mt-1" />
              <div>
                <div className="text-sm text-gray-600">Time</div>
                <div className="font-semibold text-gray-900">{sessionTime}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-evergreen mt-1" />
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-semibold text-gray-900">{sessionLocation}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-evergreen mt-1" />
              <div>
                <div className="text-sm text-gray-600">Student</div>
                <div className="font-semibold text-gray-900">{studentName} (Grade {studentGrade})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-evergreen mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6" />
            Payment Summary
          </h2>

          <div className="space-y-4">
            {promiseEligible && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-green-800">
                      Georgia Promise Scholarship Applied
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Session cost ($75.00) will be covered by scholarship once approved
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-700">Amount Paid Today:</span>
              <span className="text-2xl font-bold text-evergreen">
                ${amountPaid.toFixed(2)}
              </span>
            </div>

            {balanceDue > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Balance Due (before session):</span>
                <span className="text-xl font-bold text-orange-600">
                  ${balanceDue.toFixed(2)}
                </span>
              </div>
            )}

            {includeCurriculum && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-blue-800">
                      RootWork K-12 Curriculum Guide Included
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      Your curriculum guide will ship within 5-7 business days
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DETAILED GEORGIA PROMISE APPLICATION INSTRUCTIONS */}
        {promiseEligible && (
          <div className="bg-gradient-to-r from-gold-leaf to-yellow-400 rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-evergreen flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-3xl font-bold text-evergreen mb-2">
                  📋 Apply for Georgia Promise Scholarship
                </h3>
                <p className="text-lg font-semibold text-evergreen-dark">
                  Follow these steps to complete your application
                </p>
              </div>
            </div>

            {/* Step-by-Step Application Instructions */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h4 className="text-2xl font-bold text-evergreen mb-4">
                📋 Step-by-Step Application Process
              </h4>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Gather Required Documents</h5>
                  </div>
                  <div className="ml-11 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Proof of Residency (need 2 items):</strong>
                        <ul className="list-disc pl-6 text-sm mt-1">
                          <li>Georgia driver&apos;s license OR state-issued ID</li>
                          <li>PLUS one: utility bill (gas, water, electric), mortgage statement, or lease agreement</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Proof of Income:</strong>
                        <ul className="list-disc pl-6 text-sm mt-1">
                          <li>Most recent federal 1040 or 1040-EZ tax form</li>
                          <li>(Priority given to families with income ≤ 400% federal poverty level)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Proof of School Enrollment:</strong>
                        <ul className="list-disc pl-6 text-sm mt-1">
                          <li>Report card showing 2 consecutive semesters in Georgia public school</li>
                          <li>(Not required for rising kindergarten students)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Go to Application Website</h5>
                  </div>
                  <div className="ml-11">
                    <a
                      href="https://mygeorgiapromise.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-evergreen text-white px-6 py-3 rounded-full font-bold hover:bg-evergreen-dark transition-all shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Open mygeorgiapromise.org
                    </a>
                    <p className="text-sm text-gray-600 mt-2">
                      Visit the portal to check current application status and availability
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Create Account & Start Application</h5>
                  </div>
                  <div className="ml-11 text-sm text-gray-700">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Click &quot;Apply Now&quot; or &quot;Create Account&quot;</li>
                      <li>Enter parent/guardian email and create password</li>
                      <li>Verify email address</li>
                      <li>Log in to begin application</li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Complete Student Information</h5>
                  </div>
                  <div className="ml-11 text-sm text-gray-700">
                    <p className="mb-2"><strong>Enter the following information:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Student&apos;s full legal name: <strong>{studentName}</strong></li>
                      <li>Student&apos;s date of birth</li>
                      <li>Current grade level: <strong>{studentGrade}</strong></li>
                      <li>Home address (must match school zone)</li>
                      <li>Current school (select from eligible list)</li>
                    </ul>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Enter Parent/Guardian Information</h5>
                  </div>
                  <div className="ml-11 text-sm text-gray-700">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Full name</li>
                      <li>Contact information (phone and email)</li>
                      <li>Georgia residency duration (must be 1+ years)</li>
                      <li>Active-duty military status (if applicable)</li>
                    </ul>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      6
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Upload Required Documents</h5>
                  </div>
                  <div className="ml-11">
                    <p className="text-sm text-gray-700 mb-2">
                      Scan or take clear photos of your documents. Ensure all text is legible.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                      <p className="font-semibold text-blue-900 mb-1">💡 Pro Tip:</p>
                      <p className="text-blue-800">
                        Take photos in good lighting, ensure documents are flat, 
                        and save as JPG or PDF files. Each file should be under 10MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      7
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Select Education Provider</h5>
                  </div>
                  <div className="ml-11">
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-sm font-semibold text-green-900 mb-2">
                        ✅ Select: <strong>RootWork Framework Saturday Enrichment Program</strong>
                      </p>
                      <p className="text-sm text-green-800">
                        Search for &quot;RootWork&quot; in the provider list and select our program. 
                        This tells the state to send funds to us for your child&apos;s sessions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 8 */}
                <div className="border-l-4 border-evergreen pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center font-bold">
                      8
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Review & Submit</h5>
                  </div>
                  <div className="ml-11 text-sm text-gray-700">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Review all information for accuracy</li>
                      <li>Check that all documents uploaded successfully</li>
                      <li>Agree to program terms and conditions</li>
                      <li>Click &quot;Submit Application&quot;</li>
                      <li><strong>SAVE YOUR CONFIRMATION EMAIL!</strong></li>
                    </ul>
                  </div>
                </div>

                {/* Step 9 */}
                <div className="border-l-4 border-gold-leaf pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gold-leaf text-white rounded-full flex items-center justify-center font-bold">
                      9
                    </div>
                    <h5 className="text-xl font-bold text-evergreen">Wait for Approval Notification</h5>
                  </div>
                  <div className="ml-11 text-sm text-gray-700">
                    <p className="mb-2">You will receive email notification in <strong>February 2026</strong> with:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Approval or denial status</li>
                      <li>Scholarship account details (if approved)</li>
                      <li>Instructions for managing your account</li>
                      <li>Next steps for funding disbursement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* How Payment Works Section */}
            <div className="bg-white rounded-xl p-6">
              <h4 className="text-2xl font-bold text-evergreen mb-4 flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                How Georgia Promise Pays RootWork
              </h4>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">You Apply & Get Approved</p>
                    <p className="text-sm">
                      State approves your application and creates a scholarship account with up to $6,500
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">RootWork Bills the State</p>
                    <p className="text-sm">
                      We submit invoices to Georgia Education Savings Authority for ${' '}
                      <strong>$75.00 per session</strong> you attend
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">State Pays RootWork Directly</p>
                    <p className="text-sm">
                      Payment goes from your scholarship account to RootWork - you pay $0
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">You Track Your Balance</p>
                    <p className="text-sm">
                      Log in to your Georgia Promise portal to see remaining scholarship balance 
                      and payment history
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 border border-green-200 rounded p-4">
                <p className="text-sm text-green-800">
                  <strong>✅ You will NEVER receive a bill from RootWork for sessions covered by Georgia Promise Scholarship.</strong>
                  {' '}We handle all billing directly with the state.
                </p>
              </div>
            </div>

            {/* Important Reminders */}
            <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <h5 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                ⚠️ Important Reminders
              </h5>
              <ul className="text-sm text-red-800 space-y-1 pl-6 list-disc">
                <li>Apply as soon as you have all required documents ready</li>
                <li>Priority given to families with income ≤ 400% federal poverty level</li>
                <li>Once approved, you&apos;re in the program until student graduates</li>
                <li>Funds are distributed quarterly</li>
                <li>Your RootWork registration is confirmed regardless of scholarship approval</li>
              </ul>
            </div>
          </div>
        )}

        {/* What to Bring */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-evergreen mb-6">
            What to Bring to Your Session
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Water bottle (labeled with student name)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Weather-appropriate outdoor clothing</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Snack (we provide one, but extras welcome)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Any necessary medications (clearly labeled)</span>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All materials and learning supplies are provided. 
              Students do not need to bring notebooks, pencils, or other school supplies.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-evergreen text-evergreen rounded-full font-bold hover:bg-canvas-light transition-all"
          >
            <Download className="w-5 h-5" />
            Print Confirmation
          </button>

          {promiseEligible && (
            <a
              href="https://mygeorgiapromise.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-leaf text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Apply for GA Promise Now
            </a>
          )}

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-evergreen text-white rounded-full font-bold hover:bg-evergreen-dark transition-all shadow-lg"
          >
            Return to Home
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Questions about your registration or Georgia Promise Scholarship?
          </p>
          <a
            href="https://www.google.com/support/accounts/bin/answer.py?answer=181692"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-evergreen font-semibold hover:underline"
          >
            <ExternalLink className="w-5 h-5" />
            Visit Support Page
          </a>
        </div>

        {/* Confirmation Number Reminder */}
        <div className="mt-8 text-center bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Save your confirmation number for your records:
          </p>
          <p className="font-mono font-bold text-lg text-evergreen mt-2">
            {confirmationNumber}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-canvas-light to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-evergreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-evergreen">Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationPageContent />
    </Suspense>
  )
}
