import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <div className="flex justify-center items-center gap-4 mt-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-10 w-24" />
      </div>
      <p className="text-center text-muted-foreground mt-4">
        Generating your slides...
      </p>
    </div>
  );
}
