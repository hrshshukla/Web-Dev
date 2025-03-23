import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QRCode } from "@/components/ui/qr-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, User, Ticket, ScanLine, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const scanQrSchema = z.object({
  qrCode: z.string().min(1, "QR code is required"),
});

const manualSchema = z.object({
  ticketId: z.string().min(1, "Ticket ID is required"),
});

const eventQrSchema = z.object({
  eventCode: z.string().min(1, "Event QR code is required"),
});

type ScanQrFormValues = z.infer<typeof scanQrSchema>;
type ManualFormValues = z.infer<typeof manualSchema>;
type EventQrFormValues = z.infer<typeof eventQrSchema>;

export default function EventValidation() {
  const { toast } = useToast();
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
    ticket?: any;
    event?: any;
  } | null>(null);
  
  // QR Form
  const qrForm = useForm<ScanQrFormValues>({
    resolver: zodResolver(scanQrSchema),
    defaultValues: {
      qrCode: "",
    },
  });
  
  // Manual Form
  const manualForm = useForm<ManualFormValues>({
    resolver: zodResolver(manualSchema),
    defaultValues: {
      ticketId: "",
    },
  });
  
  // Event QR Form
  const eventQrForm = useForm<EventQrFormValues>({
    resolver: zodResolver(eventQrSchema),
    defaultValues: {
      eventCode: "",
    },
  });
  
  // Validate QR code mutation
  const validateQrMutation = useMutation({
    mutationFn: async (data: ScanQrFormValues) => {
      const res = await apiRequest("POST", "/api/tickets/verify-qr", data);
      return await res.json();
    },
    onSuccess: (data) => {
      setValidationResult({
        success: true,
        message: "Ticket validated successfully!",
        ticket: data,
      });
      qrForm.reset();
    },
    onError: (error: Error) => {
      setValidationResult({
        success: false,
        message: error.message,
      });
      toast({
        title: "Validation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Validate ticket ID mutation
  const validateTicketMutation = useMutation({
    mutationFn: async (data: ManualFormValues) => {
      const ticketId = parseInt(data.ticketId);
      const res = await apiRequest("POST", `/api/tickets/${ticketId}/validate`, {});
      return await res.json();
    },
    onSuccess: (data) => {
      setValidationResult({
        success: true,
        message: "Ticket validated successfully!",
        ticket: data,
      });
      manualForm.reset();
    },
    onError: (error: Error) => {
      setValidationResult({
        success: false,
        message: error.message,
      });
      toast({
        title: "Validation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Validate event QR code mutation
  const validateEventQrMutation = useMutation({
    mutationFn: async (data: EventQrFormValues) => {
      const res = await apiRequest("GET", `/api/events/check-in/${data.eventCode}`, {});
      return await res.json();
    },
    onSuccess: (data) => {
      setValidationResult({
        success: true,
        message: "Event check-in successful!",
        event: data.event,
      });
      eventQrForm.reset();
    },
    onError: (error: Error) => {
      setValidationResult({
        success: false,
        message: error.message,
      });
      toast({
        title: "Event check-in failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onQrSubmit = (data: ScanQrFormValues) => {
    validateQrMutation.mutate(data);
  };
  
  const onManualSubmit = (data: ManualFormValues) => {
    validateTicketMutation.mutate(data);
  };
  
  const onEventQrSubmit = (data: EventQrFormValues) => {
    validateEventQrMutation.mutate(data);
  };
  
  const resetValidation = () => {
    setValidationResult(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Ticket & Event Validation</CardTitle>
          <CardDescription>
            Verify tickets and check-in to events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="qr" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="qr" className="flex-1">Ticket QR</TabsTrigger>
              <TabsTrigger value="manual" className="flex-1">Manual ID</TabsTrigger>
              <TabsTrigger value="event" className="flex-1">Event Check-in</TabsTrigger>
            </TabsList>
            
            <TabsContent value="qr">
              <Form {...qrForm}>
                <form onSubmit={qrForm.handleSubmit(onQrSubmit)} className="space-y-4">
                  <FormField
                    control={qrForm.control}
                    name="qrCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>QR Code</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input 
                              placeholder="Enter QR code" 
                              {...field} 
                            />
                            <Button type="button" variant="outline" size="icon">
                              <ScanLine className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={validateQrMutation.isPending}
                  >
                    {validateQrMutation.isPending ? (
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
                          <Input 
                            type="number" 
                            placeholder="Enter ticket ID" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={validateTicketMutation.isPending}
                  >
                    {validateTicketMutation.isPending ? (
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
            
            <TabsContent value="event">
              <Form {...eventQrForm}>
                <form onSubmit={eventQrForm.handleSubmit(onEventQrSubmit)} className="space-y-4">
                  <FormField
                    control={eventQrForm.control}
                    name="eventCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event QR Code</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input 
                              placeholder="Enter event QR code" 
                              {...field} 
                            />
                            <Button type="button" variant="outline" size="icon">
                              <ScanLine className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Scan an event QR code for attendee check-in
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={validateEventQrMutation.isPending}
                  >
                    {validateEventQrMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking in...
                      </>
                    ) : (
                      "Check in to Event"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Result</CardTitle>
          <CardDescription>
            Check validation status here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validationResult ? (
            <div className="space-y-4">
              <Alert variant={validationResult.success ? "default" : "destructive"}>
                {validationResult.success ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {validationResult.success ? 
                    (validationResult.ticket ? "Valid Ticket" : "Event Check-in Successful") : 
                    "Validation Failed"}
                </AlertTitle>
                <AlertDescription>
                  {validationResult.message}
                </AlertDescription>
              </Alert>
              
              {validationResult.success && validationResult.ticket && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-lg mb-2">{validationResult.ticket.event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{validationResult.ticket.event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{validationResult.ticket.event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{validationResult.ticket.event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Ticket className="mr-2 h-4 w-4 text-primary/70" />
                      <span>Ticket #{validationResult.ticket.id} • Quantity: {validationResult.ticket.quantity}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {validationResult.success && validationResult.event && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-lg mb-2">{validationResult.event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{validationResult.event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{validationResult.event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{validationResult.event.location}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={resetValidation} 
                className="w-full"
                variant="outline"
              >
                Validate Another Ticket
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ScanLine className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">No Ticket Scanned</h3>
              <p className="text-slate-500">
                Scan a QR code or enter a ticket ID to validate
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
