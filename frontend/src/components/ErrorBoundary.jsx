import React from 'react'

export default class ErrorBoundary extends React.Component{
 constructor(props){
    super(props);

    this.state={hasError:false,error:null,errorInfo:null}
 }

 static getDerivedStateFromError(e){
    return {hasError:true}
 }


componentDidCatch(error,errorInfo){
  console.error('Error Caught by Error Boundary ',error,errorInfo)
  this.setState({error,errorInfo});

}

render(){
  if(this.state.hasError){

   return(
     <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
  )  
  }
 return this.props.children;
}

}