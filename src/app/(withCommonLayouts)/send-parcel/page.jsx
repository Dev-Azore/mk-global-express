"use client";
import { useState } from "react";
import {
  Package,
  User,
  MapPin,
  Phone,
  FileText,
  Home,
  Truck,
} from "lucide-react";
import Container from "../../../Components/Shared/Container/Container.jsx";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../Components/Forms/CheckoutForm.jsx";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function SendParcel() {
  const [formData, setFormData] = useState({
    parcelName: "",
    parcelWeight: "",
    senderName: "",
    senderAddress: "",
    senderContact: "",
    senderRegion: "",
    pickupInstruction: "",
    receiverName: "",
    receiverAddress: "",
    receiverContact: "",
    receiverRegion: "",
    deliveryInstruction: "",
    type: "Document",
  });

  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAmount = () => {
    // Document = ₦5000, Not-Document = ₦2000 per KG
    if (formData.type === "Document") return 500000; // kobo: ₦5000
    const weight = parseInt(formData.parcelWeight);
    if (!weight || weight <= 0) return 0;
    return weight * 200000; // kobo: ₦2000 per kg
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Non-Document weight validation
    if (formData.type === "Not-Document") {
      const weight = parseInt(formData.parcelWeight);
      if (!weight || weight <= 0) {
        toast.error("Please enter parcel weight for Non-Document type");
        return;
      }
    }

    const totalAmount = calculateAmount();
    if (totalAmount <= 0) {
      toast.error("Invalid amount calculated");
      return;
    }

    setAmount(totalAmount);
    setShowPayment(true);
  };

  return (
    <section className="bg-gray-50 rounded-xl p-6 md:p-12 mt-16 lg:mt-8">
      <Container>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Parcel</h2>
        <p className="text-gray-600 mb-2 inline-flex items-center gap-2">
          Fill in the details below to send your parcel safely <Truck />
        </p>
        <hr className="border-gray-300 mb-6" />

        {!showPayment ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 space-y-6"
          >
            {/* Parcel Type */}
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <input
                  type="radio"
                  name="type"
                  value="Document"
                  checked={formData.type === "Document"}
                  onChange={handleChange}
                  className="accent-red-500"
                />
                Document
              </label>
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <input
                  type="radio"
                  name="type"
                  value="Not-Document"
                  checked={formData.type === "Not-Document"}
                  onChange={handleChange}
                  className="accent-red-500"
                />
                Not-Document
              </label>
            </div>

            {/* Parcel Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center border rounded-xl px-3 py-2">
                <Package className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="parcelName"
                  placeholder="Parcel Name"
                  value={formData.parcelName}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>

              <div className="flex items-center border rounded-xl px-3 py-2">
                <FileText className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="number"
                  name="parcelWeight"
                  placeholder="Parcel Weight (KG)"
                  value={formData.parcelWeight}
                  onChange={handleChange}
                  disabled={formData.type === "Document"}
                  className="w-full outline-none disabled:bg-gray-100"
                  required={formData.type !== "Document"}
                />
              </div>
            </div>

            {/* Sender + Receiver */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sender */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sender Details
                </h3>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <User className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="senderName"
                    placeholder="Sender Name"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <MapPin className="text-gray-500 w-5 h-5 mr-2" />
                  <select
                    name="senderRegion"
                    value={formData.senderRegion}
                    onChange={handleChange}
                    className="w-full outline-none"
                  >
                    <option value="">Select Sender State</option>
                    <option value="kano">Kano</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                    <option value="rivers">Rivers</option>
                    <option value="kaduna">Kaduna</option>
                  </select>
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Home className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="senderAddress"
                    placeholder="Sender Address"
                    value={formData.senderAddress}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Phone className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="senderContact"
                    placeholder="Sender Contact No"
                    value={formData.senderContact}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <textarea
                  name="pickupInstruction"
                  placeholder="Pickup Instruction"
                  value={formData.pickupInstruction}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  rows="2"
                ></textarea>
              </div>

              {/* Receiver */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Receiver Details
                </h3>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <User className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="receiverName"
                    placeholder="Receiver Name"
                    value={formData.receiverName}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <MapPin className="text-gray-500 w-5 h-5 mr-2" />
                  <select
                    name="receiverRegion"
                    value={formData.receiverRegion}
                    onChange={handleChange}
                    className="w-full outline-none"
                  >
                    <option value="">Select Receiver State</option>
                    <option value="kano">Kano</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                    <option value="rivers">Rivers</option>
                    <option value="kaduna">Kaduna</option>
                  </select>
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Home className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="receiverAddress"
                    placeholder="Receiver Address"
                    value={formData.receiverAddress}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2">
                  <Phone className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    name="receiverContact"
                    placeholder="Receiver Contact No"
                    value={formData.receiverContact}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
                <textarea
                  name="deliveryInstruction"
                  placeholder="Delivery Instruction"
                  value={formData.deliveryInstruction}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              * Pickup Time 4pm-7pm Approx
            </p>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              Proceed to Confirm Booking
            </button>
          </form>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={amount}
              formData={formData}
              onSuccess={() => {
                setFormData({
                  parcelName: "",
                  parcelWeight: "",
                  senderName: "",
                  senderAddress: "",
                  senderContact: "",
                  senderRegion: "",
                  pickupInstruction: "",
                  receiverName: "",
                  receiverAddress: "",
                  receiverContact: "",
                  receiverRegion: "",
                  deliveryInstruction: "",
                  type: "Document",
                });
                setShowPayment(false);
              }}
            />
          </Elements>
        )}
      </Container>
    </section>
  );
}


