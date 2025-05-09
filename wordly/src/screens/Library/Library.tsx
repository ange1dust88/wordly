import './library.scss'
import useUserStore from '@/store/userStore';
import useModulesStore from '@/store/modulesStore';
import Module from '@/components/Module/Module';
import { useState } from 'react';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



function Library() {
  const { user } = useUserStore();
  const { modules } = useModulesStore();

  const userModules = user
    ? modules.filter((module) => module.author === user.username)
    : [];

 
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const buyPremium = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/stripe/create-checkout-session');
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Failed to create Stripe session:', err);
      alert('Error while starting payment.');
    }
  }


  const displayedModules = showAll ? userModules : userModules.slice(0, 9);

  return (
    <div className='library'>
      <div className="library_wrapper wrapper">
        <div className="library__container container"> 

          <div className="library__top">
         
              <img src="/noimg.png" className="library__top-img" />
              <div className='library__top-right'>
                <div>
                  <h2 className="library__top-username">{user?.username}</h2>
                  <h3 className="library__top-email">{user?.email}</h3>
                  <div className="library__top-status">
                    <h3>Account status:</h3>        
                    <h4>{ user?.premium ? "Premium" : "Default" }</h4>


                  </div>
                </div>
                {user?.premium !== true && (
                  <AlertDialog>
                  <AlertDialogTrigger>
                    <div className='library__top-button'>
                        Get premium
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='w-full flex flex-col'>

                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-3xl'>Ready to level up?</AlertDialogTitle>
                      <AlertDialogDescription >
                        <span className='text-lg'>Test Mode is now available for Premium users — just <b>$10 for lifetime access</b></span>  
                        <h3 className='text-lg'>You’ll get:</h3>
                        <p className='text-lg'>• Full access to Test Mode</p>
                        <p className='text-lg'>• All future premium updates — no extra cost</p>
                        <p className='text-lg text-black'>Support development and get early access today!</p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Not now</AlertDialogCancel>
                      <AlertDialogAction onClick = {buyPremium}>Get Premium Access</AlertDialogAction>
                    </AlertDialogFooter>

                  </AlertDialogContent>
                  </AlertDialog>
                                    
                )}
              </div>
            
            
            
          </div>
          <div className="library__modules">
            {displayedModules.map((module) => (
              <Module 
                title={module.title}
                description={module.description}
                code={module.code}
                key={module.code}
              />
            ))}
          </div>
          <div className="library__bottom">
            {userModules.length > 6 && !showAll && (
              <button className="library__bottom-button" onClick={toggleShowAll}>
                Show All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
