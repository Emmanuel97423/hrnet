import Navbar from '@/components/ui/Navbar';
import Form from '@/components/ui/form';
import type { InputProps } from '@/types/input';

/**
 * Home component.
 * Includes the Navbar and a Form with various input fields.
 *
 * @component
 * return <Home />
 */

const Home: React.FC = () => {
  const data: InputProps[] = [
    {
      label: 'First Name',
      type: 'text',
      placeholder: 'First Name'
      // value: ''
    },
    {
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name'
      // value: ''
    },
    {
      label: 'Birthday',
      type: 'date',
      placeholder: 'Date of Birth'
      // value: ''
    },
    {
      label: 'Start',
      type: 'date',
      placeholder: 'Start'
      // value: ''
    },
    {
      label: 'Street',
      type: 'text',
      placeholder: 'Street'
      // value: ''
    },
    {
      label: 'City',
      type: 'text',
      placeholder: 'City'
      // value: ''
    },
    {
      label: 'State',
      type: 'select',
      placeholder: 'State',
      options: [
        {
          name: 'Alabama',
          abbreviation: 'AL'
        },
        {
          name: 'Alaska',
          abbreviation: 'AK'
        },
        {
          name: 'American Samoa',
          abbreviation: 'AS'
        },
        {
          name: 'Arizona',
          abbreviation: 'AZ'
        },
        {
          name: 'Arkansas',
          abbreviation: 'AR'
        },
        {
          name: 'California',
          abbreviation: 'CA'
        },
        {
          name: 'Colorado',
          abbreviation: 'CO'
        },
        {
          name: 'Connecticut',
          abbreviation: 'CT'
        },
        {
          name: 'Delaware',
          abbreviation: 'DE'
        },
        {
          name: 'District Of Columbia',
          abbreviation: 'DC'
        },
        {
          name: 'Federated States Of Micronesia',
          abbreviation: 'FM'
        },
        {
          name: 'Florida',
          abbreviation: 'FL'
        },
        {
          name: 'Georgia',
          abbreviation: 'GA'
        },
        {
          name: 'Guam',
          abbreviation: 'GU'
        },
        {
          name: 'Hawaii',
          abbreviation: 'HI'
        },
        {
          name: 'Idaho',
          abbreviation: 'ID'
        },
        {
          name: 'Illinois',
          abbreviation: 'IL'
        },
        {
          name: 'Indiana',
          abbreviation: 'IN'
        },
        {
          name: 'Iowa',
          abbreviation: 'IA'
        },
        {
          name: 'Kansas',
          abbreviation: 'KS'
        },
        {
          name: 'Kentucky',
          abbreviation: 'KY'
        },
        {
          name: 'Louisiana',
          abbreviation: 'LA'
        },
        {
          name: 'Maine',
          abbreviation: 'ME'
        },
        {
          name: 'Marshall Islands',
          abbreviation: 'MH'
        },
        {
          name: 'Maryland',
          abbreviation: 'MD'
        },
        {
          name: 'Massachusetts',
          abbreviation: 'MA'
        },
        {
          name: 'Michigan',
          abbreviation: 'MI'
        },
        {
          name: 'Minnesota',
          abbreviation: 'MN'
        },
        {
          name: 'Mississippi',
          abbreviation: 'MS'
        },
        {
          name: 'Missouri',
          abbreviation: 'MO'
        },
        {
          name: 'Montana',
          abbreviation: 'MT'
        },
        {
          name: 'Nebraska',
          abbreviation: 'NE'
        },
        {
          name: 'Nevada',
          abbreviation: 'NV'
        },
        {
          name: 'New Hampshire',
          abbreviation: 'NH'
        },
        {
          name: 'New Jersey',
          abbreviation: 'NJ'
        },
        {
          name: 'New Mexico',
          abbreviation: 'NM'
        },
        {
          name: 'New York',
          abbreviation: 'NY'
        },
        {
          name: 'North Carolina',
          abbreviation: 'NC'
        },
        {
          name: 'North Dakota',
          abbreviation: 'ND'
        },
        {
          name: 'Northern Mariana Islands',
          abbreviation: 'MP'
        },
        {
          name: 'Ohio',
          abbreviation: 'OH'
        },
        {
          name: 'Oklahoma',
          abbreviation: 'OK'
        },
        {
          name: 'Oregon',
          abbreviation: 'OR'
        },
        {
          name: 'Palau',
          abbreviation: 'PW'
        },
        {
          name: 'Pennsylvania',
          abbreviation: 'PA'
        },
        {
          name: 'Puerto Rico',
          abbreviation: 'PR'
        },
        {
          name: 'Rhode Island',
          abbreviation: 'RI'
        },
        {
          name: 'South Carolina',
          abbreviation: 'SC'
        },
        {
          name: 'South Dakota',
          abbreviation: 'SD'
        },
        {
          name: 'Tennessee',
          abbreviation: 'TN'
        },
        {
          name: 'Texas',
          abbreviation: 'TX'
        },
        {
          name: 'Utah',
          abbreviation: 'UT'
        },
        {
          name: 'Vermont',
          abbreviation: 'VT'
        },
        {
          name: 'Virgin Islands',
          abbreviation: 'VI'
        },
        {
          name: 'Virginia',
          abbreviation: 'VA'
        },
        {
          name: 'Washington',
          abbreviation: 'WA'
        },
        {
          name: 'West Virginia',
          abbreviation: 'WV'
        },
        {
          name: 'Wisconsin',
          abbreviation: 'WI'
        },
        {
          name: 'Wyoming',
          abbreviation: 'WY'
        }
      ]
      // value: ''
    },
    {
      label: 'Zip code',
      type: 'number',
      placeholder: 'Zip Code'
      // value: ''
    },
    {
      label: 'Department',
      type: 'select',
      placeholder: 'Department',
      options: [
        { name: 'Sales', abbreviation: 'Sales' },
        { name: 'Marketing', abbreviation: 'Marketing' },
        { name: 'Engineering', abbreviation: 'Engineering' },
        { name: 'Human Resources', abbreviation: 'Human Resources' },
        { name: 'Legal', abbreviation: 'Legal' }
      ]
      // value: ''
    }
  ];

  return (
    <div className="w-screen  flex flex-col justify-start gap-8 items-center p-8">
      <Navbar />
      <Form formFields={data} />
    </div>
  );
};

export default Home;
