import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Validation schemas
const scanQrSchema = z.object({
  qrCode: z.string().min(1, { message: "QR code is required" }),
});

const manualSchema = z.object({
  ticketId: z.string().min(1, { message: "Ticket ID is required" }),
});

type ScanQrFormValues = z.infer<typeof scanQrSchema>;
type ManualFormValues = z.infer<typeof manualSchema>;

interface TicketValidationResult {
  id: number;
  eventId: number;
  userId: number;
  purchaseDate: string;
  quantity: number;
  total: string;
  qrCode: string;
  isUsed: boolean;
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
  };
}

export default function QRCodeScanner() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("scan");
  const [validatedTicket, setValidatedTicket] = useState<TicketValidationResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // QR Code form
  const qrForm = useForm<ScanQrFormValues>({
    resolver: zodResolver(scanQrSchema),
    defaultValues: {
      qrCode: "",
    },
  });

  // Manual form
  const manualForm = useForm<ManualFormValues>({
    resolver: zodResolver(manualSchema),
    defaultValues: {
      ticketId: "",
    },
  });

  // QR code validation mutation
  const qrValidationMutation = useMutation({
    mutationFn: async (data: ScanQrFormValues) => {
      const res = await apiRequest("POST", "/api/tickets/verify-qr", data);
      return res.json();
    },
    onSuccess: (data: TicketValidationResult) => {
      setValidatedTicket(data);
      setValidationError(null);
      toast({
        title: "Ticket validated",
        description: "The ticket has been successfully validated.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      setValidatedTicket(null);
      setValidationError(error.message);
      toast({
        title: "Validation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Manual validation mutation
  const manualValidationMutation = useMutation({
    mutationFn: async (data: ManualFormValues) => {
      const res = await apiRequest("POST", `/api/tickets/validate/${data.ticketId}`, {});
      return res.json();
    },
    onSuccess: (data: TicketValidationResult) => {
      setValidatedTicket(data);
      setValidationError(null);
      toast({
        title: "Ticket validated",
        description: "The ticket has been successfully validated.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      setValidatedTicket(null);
      setValidationError(error.message);
      toast({
        title: "Validation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onQrSubmit = (data: ScanQrFormValues) => {
    setValidatedTicket(null);
    setValidationError(null);
    qrValidationMutation.mutate(data);
  };

  const onManualSubmit = (data: ManualFormValues) => {
    setValidatedTicket(null);
    setValidationError(null);
    manualValidationMutation.mutate(data);
  };

  const isProcessing = qrValidationMutation.isPending || manualValidationMutation.isPending;

  const resetValidation = () => {
    setValidatedTicket(null);
    setValidationError(null);
    qrForm.reset();
    manualForm.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ticket Validation</CardTitle>
        <CardDescription>
          Scan a QR code or enter ticket ID to validate entry
        </CardDescription>
      </CardHeader>
      <CardContent>
        {validatedTicket ? (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Ticket Validated</AlertTitle>
              <AlertDescription className="text-green-700">
                This ticket has been marked as used.
              </AlertDescription>
            </Alert>
            
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Event:</span>
                <span className="text-sm">{validatedTicket.event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Ticket ID:</span>
                <span className="text-sm">{validatedTicket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date:</span>
                <span className="text-sm">{validatedTicket.event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Time:</span>
                <span className="text-sm">{validatedTicket.event.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Quantity:</span>
                <span className="text-sm">{validatedTicket.quantity}</span>
              </div>
            </div>
            
            <Button onClick={resetValidation} className="w-full">
              Validate Another Ticket
            </Button>
          </div>
        ) : validationError ? (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Validation Failed</AlertTitle>
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
            
            <Button onClick={resetValidation} className="w-full">
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="scan" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>
            <TabsContent value="scan">
              <Form {...qrForm}>
                <form onSubmit={qrForm.handleSubmit(onQrSubmit)} className="space-y-4">
                  <FormField
                    control={qrForm.control}
                    name="qrCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>QR Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter QR code" {...field} />
                        </FormControl>
                        <FormDescription>
                          Paste the QR code content here
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      "Validate QR Code"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="manual">
              <Form {...manualForm}>
                <form onSubmit={manualForm.handleSubmit(onManualSubmit)} className="space-y-4">
                  <FormField
                    control={manualForm.control}
                    name="ticketId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ticket ID" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the numeric ticket ID
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      "Validate Ticket"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}