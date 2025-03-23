import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";

interface TicketPurchaseFormProps {
  event: Event;
  onSuccess: () => void;
}

const ticketFormSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1").max(10, "Maximum 10 tickets per purchase"),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

export default function TicketPurchaseForm({ event, onSuccess }: TicketPurchaseFormProps) {
  const [_, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });
  
  const calculateTotal = (quantity: number) => {
    return (parseFloat(event.price) * quantity).toFixed(2);
  };
  
  const currentTotal = calculateTotal(form.watch("quantity") || 0);
  
  // Purchase ticket mutation
  const purchaseTicketMutation = useMutation({
    mutationFn: async (data: TicketFormValues) => {
      const ticketData = {
        eventId: event.id,
        userId: user?.id,
        quantity: data.quantity,
        total: calculateTotal(data.quantity),
      };
      
      const res = await apiRequest("POST", "/api/tickets", ticketData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Ticket purchased successfully!",
        description: "Your ticket is now available in My Tickets",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/tickets"] });
      onSuccess();
      navigate("/my-tickets");
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to purchase ticket",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: TicketFormValues) => {
    purchaseTicketMutation.mutate(data);
  };

  return (
    <div className="p-4">
      <div className="mb-6 space-y-3">
        <div className="flex items-center text-sm text-slate-600">
          <Calendar className="mr-2 h-4 w-4 text-primary" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <Clock className="mr-2 h-4 w-4 text-primary" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <MapPin className="mr-2 h-4 w-4 text-primary" />
          <span>{event.location}</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Tickets</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1} 
                    max={10} 
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(value > 10 ? 10 : value < 1 ? 1 : value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  You can purchase up to 10 tickets per order.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-slate-600">Price per ticket:</span>
              <span className="font-medium">${event.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-600">Quantity:</span>
              <span className="font-medium">{form.watch("quantity") || 0}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total:</span>
              <span className="text-primary">${currentTotal}</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={purchaseTicketMutation.isPending}
          >
            {purchaseTicketMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Purchase"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
