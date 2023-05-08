import './App.css';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const App: React.FC = () => {
  return (
    <div>
      <form>
        <Input label="First Name" type="text" placeholder="Hello World" />
      </form>
      <Button text="Hello World" color="red" />
    </div>
  );
};

export default App;
