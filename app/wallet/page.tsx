"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownToLine, ArrowUpFromLine, CreditCard, DollarSign, Wallet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("100");
  const [paymentMethod, setPaymentMethod] = useState("");
  
  // Transaction history mock data
  const transactions = [
    { id: 1, type: "deposit", method: "Credit Card", amount: 200, status: "completed", date: "May 15, 2025" },
    { id: 2, type: "withdraw", method: "Bank Transfer", amount: 150, status: "completed", date: "May 10, 2025" },
    { id: 3, type: "deposit", method: "PayPal", amount: 100, status: "completed", date: "May 5, 2025" },
    { id: 4, type: "withdraw", method: "Bank Transfer", amount: 75, status: "processing", date: "May 3, 2025" },
    { id: 5, type: "deposit", method: "Credit Card", amount: 300, status: "completed", date: "Apr 25, 2025" },
    { id: 6, type: "deposit", method: "PayPal", amount: 50, status: "completed", date: "Apr 18, 2025" }
  ];
  
  const handleAmountQuickSelect = (value: string) => {
    setAmount(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    toast.success(
      `${activeTab === "deposit" ? "Deposit" : "Withdrawal"} Successful`, 
      { description: `Your ${activeTab === "deposit" ? "deposit" : "withdrawal"} of $${amount} is being processed.` }
    );
    
    // Reset form
    setAmount("100");
    setPaymentMethod("");
  };
  
  return (
    <div className="bg-[#121212] min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold font-manrope">Wallet</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 text-[#7ED957] mr-2" />
                  <span className="text-3xl font-bold">$920.00</span>
                </div>
                <Button variant="link" className="text-[#00D4FF] p-0 h-auto text-xs mt-2">View transaction history</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Total Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ArrowDownToLine className="h-6 w-6 text-[#00D4FF] mr-2" />
                  <span className="text-3xl font-bold">$1,500.00</span>
                </div>
                <p className="text-xs text-[#CCCCCC] mt-2">Last deposit: May 15, 2025</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Total Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ArrowUpFromLine className="h-6 w-6 text-[#FF4C4C] mr-2" />
                  <span className="text-3xl font-bold">$580.00</span>
                </div>
                <p className="text-xs text-[#CCCCCC] mt-2">Last withdrawal: May 10, 2025</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-[#333333] lg:col-span-2">
              <Tabs defaultValue="deposit" value={activeTab} onValueChange={setActiveTab}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-manrope">Deposit & Withdraw</CardTitle>
                    <TabsList className="bg-[#252525]">
                      <TabsTrigger value="deposit" className="data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                        Deposit
                      </TabsTrigger>
                      <TabsTrigger value="withdraw" className="data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                        Withdraw
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <TabsContent value="deposit" className="space-y-6 mt-0">
                      <div>
                        <Label htmlFor="amount" className="text-sm">Amount</Label>
                        <div className="relative mt-1.5">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CCCCCC] h-4 w-4" />
                          <Input 
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-10 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                            type="number"
                            min="10"
                            step="0.01"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {["50", "100", "200", "500"].map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant="outline"
                              size="sm"
                              className={`min-w-[60px] ${amount === value ? 'bg-[#7ED957]/10 border-[#7ED957]/30 text-[#7ED957]' : ''}`}
                              onClick={() => handleAmountQuickSelect(value)}
                            >
                              ${value}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="payment-method" className="text-sm">Payment Method</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger id="payment-method" className="mt-1.5 bg-[#252525] border-[#333333] focus:ring-[#7ED957]">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#252525] border-[#333333]">
                            <SelectItem value="credit-card">Credit / Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {paymentMethod === "credit-card" && (
                          <div className="mt-4 space-y-4 animate-in fade-in-0 zoom-in-95">
                            <div>
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input 
                                id="card-number"
                                className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                placeholder="**** **** **** ****"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input 
                                  id="expiry"
                                  className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input 
                                  id="cvc"
                                  className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                  placeholder="***"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === "paypal" && (
                          <div className="mt-4 animate-in fade-in-0 zoom-in-95">
                            <p className="text-sm text-[#CCCCCC]">You will be redirected to PayPal to complete your deposit.</p>
                          </div>
                        )}
                        
                        {paymentMethod === "bank-transfer" && (
                          <div className="mt-4 animate-in fade-in-0 zoom-in-95">
                            <p className="text-sm text-[#CCCCCC] mb-2">Bank account details</p>
                            <div className="bg-[#252525] rounded-lg p-3 border border-[#333333] space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-[#CCCCCC]">Account Name</span>
                                <span>BetPro Inc</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-[#CCCCCC]">Account Number</span>
                                <span>**** **** 5678</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-[#CCCCCC]">Routing Number</span>
                                <span>**** **** 1234</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === "crypto" && (
                          <div className="mt-4 animate-in fade-in-0 zoom-in-95">
                            <p className="text-sm text-[#CCCCCC] mb-2">Supported cryptocurrencies</p>
                            <div className="flex flex-wrap gap-2">
                              {["Bitcoin", "Ethereum", "USDT", "USDC"].map((crypto) => (
                                <Badge key={crypto} variant="outline" className="bg-[#252525]">
                                  {crypto}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-[#CCCCCC] mt-3">
                              After clicking deposit, you will receive wallet address details.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="bg-[#333333]" />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Deposit Total:</p>
                          <p className="text-xs text-[#CCCCCC]">
                            No fees on deposits
                          </p>
                        </div>
                        <p className="text-xl font-bold">${parseFloat(amount || "0").toFixed(2)}</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#7ED957] hover:bg-[#6BC047] text-black font-semibold"
                        disabled={!amount || parseFloat(amount) <= 0 || !paymentMethod}
                      >
                        Deposit Funds
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="withdraw" className="space-y-6 mt-0">
                      <div>
                        <Label htmlFor="withdraw-amount" className="text-sm">Amount</Label>
                        <div className="relative mt-1.5">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CCCCCC] h-4 w-4" />
                          <Input 
                            id="withdraw-amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-10 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                            type="number"
                            min="10"
                            max="920"
                            step="0.01"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-[#CCCCCC]">Available: $920.00</span>
                          <Button 
                            type="button" 
                            variant="link" 
                            className="text-[#00D4FF] p-0 h-auto text-xs"
                            onClick={() => setAmount("920")}
                          >
                            Withdraw All
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {["50", "100", "200", "500"].map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant="outline"
                              size="sm"
                              className={`min-w-[60px] ${amount === value ? 'bg-[#7ED957]/10 border-[#7ED957]/30 text-[#7ED957]' : ''}`}
                              onClick={() => handleAmountQuickSelect(value)}
                            >
                              ${value}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="withdraw-method" className="text-sm">Withdraw Method</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger id="withdraw-method" className="mt-1.5 bg-[#252525] border-[#333333] focus:ring-[#7ED957]">
                            <SelectValue placeholder="Select withdraw method" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#252525] border-[#333333]">
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {paymentMethod === "bank-transfer" && (
                          <div className="mt-4 space-y-4 animate-in fade-in-0 zoom-in-95">
                            <div>
                              <Label htmlFor="account-name">Account Holder Name</Label>
                              <Input 
                                id="account-name"
                                className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <Label htmlFor="account-number">Account Number</Label>
                              <Input 
                                id="account-number"
                                className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                placeholder="**** **** **** ****"
                              />
                            </div>
                            <div>
                              <Label htmlFor="routing-number">Routing Number</Label>
                              <Input 
                                id="routing-number"
                                className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                placeholder="*********"
                              />
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === "paypal" && (
                          <div className="mt-4 animate-in fade-in-0 zoom-in-95">
                            <div>
                              <Label htmlFor="paypal-email">PayPal Email</Label>
                              <Input 
                                id="paypal-email"
                                type="email"
                                className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                placeholder="your-email@example.com"
                              />
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === "crypto" && (
                          <div className="mt-4 animate-in fade-in-0 zoom-in-95">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="crypto-currency">Select Cryptocurrency</Label>
                                <Select>
                                  <SelectTrigger id="crypto-currency" className="mt-1.5 bg-[#252525] border-[#333333] focus:ring-[#7ED957]">
                                    <SelectValue placeholder="Select cryptocurrency" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#252525] border-[#333333]">
                                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                                    <SelectItem value="usdt">USDT</SelectItem>
                                    <SelectItem value="usdc">USDC</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="wallet-address">Wallet Address</Label>
                                <Input 
                                  id="wallet-address"
                                  className="mt-1.5 bg-[#252525] border-[#333333] focus-visible:ring-[#7ED957]"
                                  placeholder="Enter your wallet address"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="bg-[#333333]" />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Withdrawal Total:</p>
                          <p className="text-xs text-[#CCCCCC]">
                            Processing time: 1-3 business days
                          </p>
                        </div>
                        <p className="text-xl font-bold">${parseFloat(amount || "0").toFixed(2)}</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#7ED957] hover:bg-[#6BC047] text-black font-semibold"
                        disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > 920 || !paymentMethod}
                      >
                        Withdraw Funds
                      </Button>
                    </TabsContent>
                  </form>
                </CardContent>
              </Tabs>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-xl font-manrope">Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-[#252525] border-[#333333]">
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-[#252525] border-[#333333]">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                transaction.type === 'deposit' 
                                  ? 'bg-[#7ED957]/20 text-[#7ED957]' 
                                  : 'bg-[#FF4C4C]/20 text-[#FF4C4C]'
                              }`}>
                                {transaction.type === 'deposit' 
                                  ? <ArrowDownToLine className="h-4 w-4" />
                                  : <ArrowUpFromLine className="h-4 w-4" />
                                }
                              </div>
                              <div>
                                <p className="text-sm font-medium capitalize">{transaction.type}</p>
                                <p className="text-xs text-[#CCCCCC]">{transaction.method}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className={`text-sm font-medium ${
                              transaction.type === 'deposit' 
                                ? 'text-[#7ED957]' 
                                : 'text-[#FF4C4C]'
                            }`}>
                              {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{transaction.date}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`
                              ${transaction.status === 'completed' 
                                ? 'bg-[#7ED957]/10 text-[#7ED957] border-[#7ED957]/30' 
                                : 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30'}
                            `}>
                              {transaction.status === 'processing' && (
                                <span className="animate-pulse mr-1">●</span>
                              )}
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}