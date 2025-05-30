"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";

import { useCallback, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "react-markdown";
import { ButtonReportAiProps } from "./button-report-ai.types";
import { generateAiReport } from "../_actions";

export const ButtonReportAi = ({ month }: ButtonReportAiProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const handleGenerateReport = useCallback(async () => {
    try {
      setReportIsLoading(true);
      const getReportAi = await generateAiReport({ month });
      setReport(getReportAi);
      setReportIsLoading(false);
    } catch (error) {
      console.error("handleGenerateReport error:", error);
      setReportIsLoading(false);
    }
  }, [month]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer border">
          Relatório IA
          <BotIcon />
        </Button>
        {/* <Button variant="secondary" className="border">
          Gerar relatório IA <FileText size={15} />
        </Button> */}
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatório com insights
            sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={handleGenerateReport}
            disabled={reportIsLoading}
            className="cursor-pointer"
          >
            {reportIsLoading && <Loader2Icon className="animate-spin" />}
            Gerar relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
