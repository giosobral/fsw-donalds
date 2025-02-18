import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Product = () => {
  return (
    <div className="flex gap-3 bg-red-900 p-6">
      <h1 className="text-red-400">Produto</h1>
      <Button>FSW 7.0</Button>
      <Input placeholder="Escreva aqui" />
    </div>
  );
};

export default Product;
