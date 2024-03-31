/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf';
import logoImage from './assets/YOGVAN LOGO NEW.png'


export const generateReceipt = (
    paymentId: any,
    orderId: any,
    amount: any,
    firstName: any,
    lastName: any,
    email: any,
    checkIn: any,
    checkOut: any,
    adultCount: any,
    childCount: any,
    hotelName: any,
    hotelLocation: any,
    phoneNumber: any,
  ) => {
    const doc = new jsPDF();
  
    // Check if logo image is provided
    if (logoImage) {
      // Add the image to the PDF
      doc.addImage(logoImage, 'JPEG', 10, 10, 50, 0); // Add logo at position (10, 10) with width 50
    }
  
  
    // Add header content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Payment Reciept", doc.internal.pageSize.getWidth()-50, 15); // Adjust the position of the company name
  
    // Add footer content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Contact: 9811511253", 10, doc.internal.pageSize.getHeight() - 10);
    doc.text("Email: yogvanholidays@gmail.com", 80, doc.internal.pageSize.getHeight() - 10);
  
    // Add content to the PDF
    doc.setFontSize(8);
    doc.text(`Payment ID: ${paymentId}`, 10, 30);
    doc.text(`Order ID: ${orderId}`, 10, 35);
    doc.setFontSize(12);
    doc.text(`Guest Name: ${firstName} ${lastName}`, 10, 50);
    doc.text(`Phone Number: ${phoneNumber}`, 10, 55);
    doc.text(`Email: ${email}`, 10, 60);
    const checkInDate = new Date(checkIn).toLocaleDateString();
    const checkOutDate = new Date(checkOut).toLocaleDateString();
    doc.text(`Check-in Date: ${checkInDate}`, 10, 80);
    doc.text(`Check-out Date: ${checkOutDate}`, 10, 90);
    doc.text(`Adults: ${adultCount} - Children: ${childCount}`, 10, 100);
    doc.setFontSize(16);
    doc.text(`Hotel Name: ${hotelName}`, 10, 120);
    doc.text(`Location: ${hotelLocation}`, 10, 130);
    doc.setFontSize(32);
    doc.text(`Total Amount Paid: ${amount}`, 10, 150);
  
    // Save the PDF
    doc.save(`Receipt_${paymentId}.pdf`);
  };