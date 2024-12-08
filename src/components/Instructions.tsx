import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GameStatsProps {
  mode?: "normal" | "hard";
  singleDay?: boolean;
}

const Instructions = ({ mode, singleDay = false }: GameStatsProps) => {
  return (
    <Tabs defaultValue="normal" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="normal">Normal Mode</TabsTrigger>
        <TabsTrigger value="hard">Hard Mode</TabsTrigger>
      </TabsList>
      <TabsContent value="normal" className="mt-6">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            How to Play
          </h2>

          <ul className="text-left space-y-6 text-gray-600">
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Match city names with their corresponding airport codes
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Choose from multiple possible airport codes
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">Use a hint to help figure it out</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Get instant feedback on your answers
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Complete all rounds to test your knowledge
              </span>
            </li>
          </ul>
        </div>
      </TabsContent>
      <TabsContent value="hard" className="mt-6">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            How to Play
          </h2>

          <ul className="text-left space-y-6 text-gray-600">
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Guess the correct airport code for the given city
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Each wrong answer gives you a hint toward the answer
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">5 Attempts Only!</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">
                Get instant feedback on your answers
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">•</span>
              <span className="text-lg">Guess the correct code and win!</span>
            </li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Instructions;
