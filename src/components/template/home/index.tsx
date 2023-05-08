import Navbar from '@/components/molecules/Navbar';
import Form from '@/components/molecules/form';
const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Navbar />
      <Form />
    </div>
  );
};

export default Home;
