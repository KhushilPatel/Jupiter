import Patient_List from '@/components/Patient/List/Patient-List';
import Sider from '@/components/UI/Sider';

const Patient = () => {
  return (
    <div className="flex gap-4">
      <div className="w-[20%]">
        <Sider />
      </div>
      <div className="w-full h-full">
        <Patient_List />
      </div>
    </div>
  );
};

export default Patient;
