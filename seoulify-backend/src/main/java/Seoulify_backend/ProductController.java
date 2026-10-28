
package Seoulify_backend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add a new product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // Update an existing product
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Integer id,
            @RequestBody Product updatedProduct) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setCategory(updatedProduct.getCategory());
        product.setArtist(updatedProduct.getArtist());
        product.setPrice(updatedProduct.getPrice());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setStock(updatedProduct.getStock());

        return productRepository.save(product);
    }
    
@DeleteMapping("/{id}")
public void deleteProduct(@PathVariable Integer id) {
    if (!productRepository.existsById(id)) {
        throw new RuntimeException("Product not found");
    }

    productRepository.deleteById(id);
}

}
