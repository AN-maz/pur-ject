export const generateWhatsAppMessage = (cartItems, totalAmount) => {

    const phoneNumber = "6281229386986";

    let message = "Punten Min, Abi bade order:\n\n";

    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.quantity} ${item.unit})\n`;
        message += `   Harga: Rp ${item.price.toLocaleString("id-ID")} x ${item.quantity}\n`;
        message += `   Subtotal: Rp ${(item.price * item.quantity).toLocaleString("id-ID")}\n\n`;
    });

    message += `*Total Belanja: Rp ${totalAmount.toLocaleString("id-ID")}*\n\n`;
    message += "Punten kin dikintun ka alamat Abi. Hatur Thankyou";

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
