// Footer Component

function renderFooter() {
    const footer = document.getElementById('footer-component');

    footer.innerHTML = `
        <footer class="bg-gray-900 text-white py-12 px-4">
            <div class="container mx-auto max-w-7xl">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <!-- About -->
                    <div>
                        <h3 class="text-xl font-bold mb-4 text-pink-400">Glow Beauty</h3>
                        <p class="text-gray-400 mb-4">Your trusted destination for premium beauty and cosmetics products.</p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-2xl hover:text-pink-400 transition"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="text-2xl hover:text-pink-400 transition"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="text-2xl hover:text-pink-400 transition"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-2xl hover:text-pink-400 transition"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4" data-i18n="footer.quickLinks">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a href="./about.html" class="text-gray-400 hover:text-white transition" data-i18n="footer.about">About Us</a></li>
                            <li><a href="./contact.html" class="text-gray-400 hover:text-white transition" data-i18n="footer.contact">Contact Us</a></li>
                            <li><a href="./blog.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.blog">Blog</a></li>
                            <li><a href="./skin-quiz.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.skinQuiz">Skin Quiz</a></li>
                        </ul>
                    </div>
                    
                    <!-- Customer Service -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4" data-i18n="footer.customerService">Customer Service</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-400 hover:text-white transition" data-i18n="footer.faq">FAQ</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition">Shipping Info</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition">Returns</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition" data-i18n="footer.privacy">Privacy Policy</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition" data-i18n="footer.terms">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    <!-- Contact Info -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4" data-i18n="footer.contact">Contact Us</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><i class="fas fa-phone mr-2"></i> +20 123 456 7890</li>
                            <li><i class="fas fa-envelope mr-2"></i> info@glowbeauty.com</li>
                            <li><i class="fas fa-map-marker-alt mr-2"></i> Cairo, Egypt</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Payment Methods -->
                <div class="border-t border-gray-800 pt-8 mb-8">
                    <h4 class="text-center text-lg font-semibold mb-4" data-i18n="footer.paymentMethods">Payment Methods</h4>
                    <div class="flex justify-center items-center space-x-6 text-3xl text-gray-400">
                        <i class="fab fa-cc-visa"></i>
                        <i class="fab fa-cc-mastercard"></i>
                        <i class="fas fa-mobile-alt"></i>
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                </div>
                
                <!-- Copyright -->
                <div class="text-center text-gray-400 border-t border-gray-800 pt-8">
                    <p data-i18n="footer.copyright">© 2024 Glow Beauty. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;

    updatePageTranslations();
}

// Initialize footer on page load
document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
});
