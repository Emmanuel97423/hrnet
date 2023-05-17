import './App.css';
import Button from '@/components/ui/common/Button';
import Input from '@/components/ui/Input';

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
