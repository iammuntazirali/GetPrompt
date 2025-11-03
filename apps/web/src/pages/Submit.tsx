import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SubmitForm } from "@/components/submit/SubmitForm";
import { useSubmitForm } from "@/hooks/useSubmitForm";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Submit = () => {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    isSubmitting,
    validations,
    isFormValid,
    handleTagToggle,
    handleSubmit,
  } = useSubmitForm();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2 hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>

          <SubmitForm
            formData={formData}
            setFormData={setFormData}
            validations={validations}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            onTagToggle={handleTagToggle}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Submit;
