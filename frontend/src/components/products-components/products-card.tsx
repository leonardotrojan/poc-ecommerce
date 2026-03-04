import { Button, Text, View } from "react-native"

type Product = {
    id: string
    name: string
    description: string
    price: string
}

type Props = {
    product: Product
    onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: Props) {
    return (
        <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text style={{ marginVertical: 4 }}>R$ {product.price}</Text>
            <Button  title="Adicionar ao carrinho" onPress={() => onAddToCart(product)} />
        </View>
    )
}