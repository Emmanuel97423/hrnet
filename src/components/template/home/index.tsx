import Navbar from '@/components/molecules/Navbar';
import Form from '@/components/molecules/form';
const Home: React.FC = () => {
  return (
    <div className="w-screen  flex flex-col justify-start gap-8 items-center p-8">
      <Navbar />
      <Form />
    </div>
  );
};

export default Home;
