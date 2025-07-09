"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, CreditCard, Download, Printer } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const NoDueFormPage = () => {
  const [dues, setDues] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [roll, setRoll] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      setRoll(session.user.email.split("@")[0])
    }
  }, [session])

  useEffect(() => {
    if (!roll) return

    const fetchDues = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/nodue?roll=${roll}`)
        if (!res.ok) throw new Error("Failed to fetch dues")
        const duesData = await res.json()
        setDues(duesData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDues()
  }, [roll])



 
  

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Create a new window with the certificate content
    const printWindow = window.open("", "_blank")
    const certificateContent = document.getElementById("no-due-certificate")

    if (printWindow && certificateContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>No Due Certificate - ${roll}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .certificate { max-width: 800px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 30px; }
              .content { line-height: 1.6; }
              .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${certificateContent.innerHTML}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-muted-foreground">Loading your due status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Error: {error}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  
  const isAllPaid = dues?.every((due)=>due.status==="paid")
  const outstandingAmount = dues.reduce((acc, due) => acc + due.amount_pending, 0);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {!isAllPaid ? (
          // Outstanding Dues View
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Outstanding Dues</CardTitle>
              <CardDescription>
                You have pending dues that need to be cleared before generating your No Due Certificate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">Total Outstanding Amount:</span>
                  <Badge variant="destructive" className="text-lg px-3 py-1">
                    ₹{outstandingAmount}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Roll Number: <span className="font-medium">{roll}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Student: <span className="font-medium">{session?.user?.name || "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: <span className="font-medium">{session?.user?.email}</span>
                  </p>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please clear all outstanding dues before requesting your No Due Certificate. Contact the accounts
                  department for payment details.
                </AlertDescription>
              </Alert>

              <div className="flex justify-center">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Outstanding Dues
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // No Due Certificate View
          <div className="space-y-6">
            <Card className="w-full">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-800">All Dues Cleared!</CardTitle>
                <CardDescription>Congratulations! You can now download your No Due Certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4 mb-6">
                  <Button onClick={handlePrint} variant="outline" size="lg">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Certificate
                  </Button>
                  <Button onClick={handleDownload} size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* No Due Certificate */}
            <Card className="w-full print:shadow-none print:border-none">
              <CardContent className="p-8" id="no-due-certificate">
                <div className="certificate max-w-4xl mx-auto">
                  <div className="header text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">NO DUE CERTIFICATE</h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Academic Institution Name</p>
                    <p className="text-sm text-gray-500">Institution Address, City, State - PIN</p>
                  </div>

                  <div className="content space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-4 text-center">CERTIFICATE OF CLEARANCE</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-600">Student Name:</p>
                          <p className="font-semibold text-lg">{session?.user?.name || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Roll Number:</p>
                          <p className="font-semibold text-lg">{roll}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email:</p>
                          <p className="font-semibold">{session?.user?.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Certificate Date:</p>
                          <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="text-center mb-6">
                        <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                          ✓ ALL DUES CLEARED
                        </Badge>
                      </div>

                      <div className="space-y-4 text-sm">
                        <p className="text-justify">
                          This is to certify that{" "}
                          <strong>{session?.user?.name || "the above-mentioned student"}</strong>
                          with Roll Number <strong>{roll}</strong> has cleared all outstanding dues including but not
                          limited to:
                        </p>

                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Library dues and fines</li>
                          <li>Laboratory equipment charges</li>
                          <li>Hostel and mess charges</li>
                          <li>Academic fees and penalties</li>
                          <li>Sports and recreational facility charges</li>
                          <li>Any other institutional charges</li>
                        </ul>

                        <p className="text-justify">
                          The student has no pending financial obligations with the institution as of the date mentioned
                          above. This certificate is issued for official purposes and is valid for all academic and
                          administrative procedures.
                        </p>
                      </div>
                    </div>

                    <div className="signature-section flex justify-between items-end pt-8">
                      <div className="text-center">
                        <div className="w-40 border-b border-gray-400 mb-2"></div>
                        <p className="text-sm font-medium">Accounts Officer</p>
                        <p className="text-xs text-gray-500">Finance Department</p>
                      </div>

                      <div className="text-center">
                        <div className="w-40 border-b border-gray-400 mb-2"></div>
                        <p className="text-sm font-medium">Registrar</p>
                        <p className="text-xs text-gray-500">Academic Affairs</p>
                      </div>
                    </div>

                    <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
                      <p>This is a computer-generated certificate and does not require a physical signature.</p>
                      <p>
                        Certificate ID: NOD-{roll}-{new Date().getFullYear()}-{String(Date.now()).slice(-6)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoDueFormPage
