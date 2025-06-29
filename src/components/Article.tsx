import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";

interface ArticleCardProps {
  title: string;
  thumbnail: string;
  content: string;
  category: string;
}

export default function ArticleCard(props: ArticleCardProps) {
  return (
    <Card className="max-w-[40rem] w-auto">
      {/* Thumbnail */}
      <img
        src={props.thumbnail}
        alt={props.title}
        className="w-full object-cover rounded-t-md"
      />

      {/* Konten */}
      <CardHeader>
        <CardTitle className="text-lg">{props.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {props.category}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-300 line-clamp-3">{props.content}</p>
      </CardContent>
    </Card>
  );
}
