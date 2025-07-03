"use client";
import CardCreator from "@/compotents/CardCreator";
import CardList from "@/compotents/CardList";
import CardContextProvider from "@/contexts/CardContextProvider";

export default function Home() {
  return (
    <div>
      <main>
        <CardContextProvider>
          <CardCreator />
          <CardList />
        </CardContextProvider>
      </main>
    </div>
  );
}
