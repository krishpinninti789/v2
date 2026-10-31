"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  GraduationCap,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const currency = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const StatCard = ({ label, value, detail, icon: Icon, tone }) => (
  <div className="surface-card flex items-start justify-between p-5">
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
      <Icon className="h-5 w-5" />
    </div>
  </div>
);

const DueDetails = ({ data }) => {
  const router = useRouter();

  if (!data) {
    return (
      <div className="surface-card flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c2ef4e]/40 text-[#422082]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">All clear</p>
        <h2 className="text-2xl font-semibold text-slate-950">No pending dues</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
          You’re up to date. New fee records and receipts will appear here when available.
        </p>
      </div>
    );
  }

  const dues = data.dues || [];
  const totalAmount = dues.reduce((sum, due) => sum + Number(due.amount || 0), 0);
  const totalPaid = dues.reduce((sum, due) => sum + Number(due.amount_paid || 0), 0);
  const totalPending = dues.reduce((sum, due) => sum + Number(due.amount_pending || 0), 0);
  const pendingDues = dues.filter((due) => due.status !== "paid");
  const paidPercent = totalAmount ? Math.round((totalPaid / totalAmount) * 100) : 0;

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-[#1f1633] p-6 text-white shadow-lg sm:p-8"
      >
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#6a5fc1]/30 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium text-[#c2ef4e]">Student finance overview</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back, {data.roll?.toUpperCase()}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
              <GraduationCap className="h-4 w-4" />
              Academic year {data.year}
            </p>
          </div>
          <div className="min-w-[220px] rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Payment progress</span>
              <span className="font-semibold text-[#c2ef4e]">{paidPercent}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${paidPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-[#c2ef4e]"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">{currency(totalPaid)} settled of {currency(totalAmount)}</p>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total fees" value={currency(totalAmount)} detail={`${dues.length} fee records`} icon={CircleDollarSign} tone="bg-violet-100 text-violet-700" />
        <StatCard label="Paid so far" value={currency(totalPaid)} detail={`${paidPercent}% of total fees`} icon={CheckCircle2} tone="bg-[#c2ef4e]/50 text-[#422082]" />
        <StatCard label="Outstanding" value={currency(totalPending)} detail={pendingDues.length ? `${pendingDues.length} action${pendingDues.length === 1 ? "" : "s"} needed` : "Nothing due"} icon={WalletCards} tone="bg-amber-100 text-amber-700" />
        <StatCard label="Account status" value={pendingDues.length ? "Review due" : "Up to date"} detail="Securely synced" icon={ShieldCheck} tone="bg-sky-100 text-sky-700" />
      </div>

      <section className="surface-card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-[#6a5fc1]" />
              <h2 className="text-lg font-semibold text-slate-950">Your fee records</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Review balances and complete outstanding payments.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push("/student/view-payments")}>
            View payment history <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div>
          {dues.map((due, index) => {
            const isPaid = due.status === "paid";
            const dueProgress = due.amount ? Math.round((due.amount_paid / due.amount) * 100) : 0;
            return (
              <motion.div
                key={due._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="border-b border-slate-100 px-5 py-5 last:border-0 sm:px-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-slate-950">{due.duetype}</h3>
                      <Badge className={isPaid ? "bg-[#c2ef4e]/40 text-[#422082] hover:bg-[#c2ef4e]/40" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                        {isPaid ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <Clock3 className="mr-1 h-3 w-3" />}
                        {isPaid ? "Paid" : "Pending"}
                      </Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                      <div><p className="text-xs text-slate-400">Total</p><p className="mt-1 font-medium text-slate-800">{currency(due.amount)}</p></div>
                      <div><p className="text-xs text-slate-400">Paid</p><p className="mt-1 font-medium text-emerald-700">{currency(due.amount_paid)}</p></div>
                      <div><p className="text-xs text-slate-400">Balance</p><p className="mt-1 font-medium text-slate-800">{currency(due.amount_pending)}</p></div>
                      <div><p className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" />Due date</p><p className="mt-1 font-medium text-slate-800">{formatDate(due.due_date)}</p></div>
                    </div>
                    {!isPaid && (
                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-1.5 max-w-xs flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#6a5fc1]" style={{ width: `${dueProgress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-slate-400">{dueProgress}% paid</span>
                      </div>
                    )}
                  </div>
                  <Button
                    disabled={isPaid}
                    variant={isPaid ? "secondary" : "default"}
                    className={isPaid ? "text-slate-400" : "bg-[#150f23] text-white hover:bg-[#422082]"}
                    onClick={() => router.push(`/student/paydue/pay-due?roll=${data.roll}&id=${due._id}`)}
                  >
                    {isPaid ? <CheckCircle2 className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                    {isPaid ? "Paid" : "Pay now"}
                    {!isPaid && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {pendingDues.length > 0 && (
        <div className="flex flex-col gap-4 rounded-2xl border border-[#6a5fc1]/20 bg-[#6a5fc1]/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white p-2 text-[#422082]"><CreditCard className="h-5 w-5" /></div>
            <div>
              <p className="font-semibold text-[#1f1633]">Ready to clear your balance?</p>
              <p className="mt-1 text-sm text-[#422082]/75">You have {currency(totalPending)} remaining across {pendingDues.length} fee record{pendingDues.length === 1 ? "" : "s"}.</p>
            </div>
          </div>
          <Button className="bg-[#150f23] text-white hover:bg-[#422082]" onClick={() => router.push(`/student/paydue/pay-all?roll=${data.roll}`)}>
            Pay outstanding balance <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DueDetails;
