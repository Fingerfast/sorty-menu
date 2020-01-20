import Modal from "react-modal";
import React, {useCallback, useState} from "react";
import styled from 'styled-components';
import useAxios from "axios-hooks";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const MyInput = styled.input`
  border: 1px solid #007eff;
`;

const MyButton = styled.button`
  border: 1px solid #007eff;
`;

export default function MyModal ({activated, setActivated}) {
  const [title, setTitle] = useState('')
  // const [
  //   { data: postData, loading: postLoading, error: postError }, executePost] = useAxios(
  //   {
  //     url: 'http://mnovak4:1337/menu-editor/menu',
  //     method: 'POST'
  //   },
  //   { manual: true }
  // )
  // const updateData = useCallback ((title) => {
  //   executePost({
  //     data: {
  //       title: title,
  //     }
  //   })
  //   // TODO: do POST request with title
  // }, [])

  return (
    <Modal
      isOpen={activated}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={setActivated}
      style={customStyles}
      contentLabel="Example Modal"
    >

      {/*<h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>*/}
      {/*<button onClick={closeModal}>close</button>*/}
      <div>Zadejte název menu</div>
      <form>
        <MyInput />
        <MyButton>ulozit</MyButton>
      </form>
    </Modal>
  )
}
