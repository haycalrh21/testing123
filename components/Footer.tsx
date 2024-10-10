export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>We are a modern e-commerce store offering high-quality products at competitive prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: info@nextecommerce.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 E-commerce St, Web City, 12345</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 NextJS E-commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}