import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Input, Textarea } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import '../style/post.css';
import SearchBar from "./searchbar";
import bgp from '../assets/image/bgp4.svg';
import { AddPost } from "./addposts";
import Chip from "@mui/material/Chip";

function Post() {
  const [postName, setPostName] = useState("");
  const [overview, setOverview] = useState("");
  const [stepCount, setStepCount] = useState(1);
  const [stepTexts, setStepTexts] = useState([ '' ]);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailFile, setThumbnailFile] =  useState("");
  const [thumbnailUrl, setThumbnailUrl] =  useState("");
  const [instructions, setInstructions] = useState([{}]);
  const [instructionImgs, setInstructionImgs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
//   {img_url:"", process_explanation:"",process_num:1}
  const date = new Date();
  const dateStr = date.toISOString();
 
  const addStep = () => {
    setStepCount(stepCount + 1);
    setStepTexts([...stepTexts, '']);
	setInstructions([...instructions , {}]);
  };

  const deleteStep = (stepNumber) => {
    setStepCount(stepCount - 1);
    setStepTexts(stepTexts.slice(0, stepTexts.length - 1));
	setInstructions(instructions.slice(0, instructions.length - 1));
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]); // Add the tag to the array
      setTagInput(""); // Clear the input field
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

// instruction関係の関数
const handleAddInstructionText = (e, index) => {
	let newInstruction = instructions[index];
	newInstruction["process_explanation"] = e.target.value;
	setInstructions(
		instructions.map((instruction, i) => (i == index ? newInstruction : instruction))
	)
	console.log(instructions);
}

const handleAddInstructionImg = async (e, index) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = async (e) => {
			await setSelectedFile(e.target.result);
			console.log("load img file" + selectedFile);
		}
		await reader.readAsDataURL(file);

		let newInstruction = instructions[index];
		newInstruction["img_url"] = "images/" + file.name;
		newInstruction["file"] = file;
		newInstruction["img"] = selectedFile;
		console.log("added selectedFile = " + selectedFile);
		setInstructions(
			instructions.map((instruction, i) => (i == index ? newInstruction : instruction))
		);
	}
}


  const handleThumbnailImageFile = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setThumbnailFile(file);
    const url = file.name;
    setThumbnailUrl("images/" + url);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    // if (!postName || !overview || stepTexts.some((text) => !text.trim())) {
	if (!postName || !overview) {
      alert("すべてのフィールドを入力してください。");
      return;
    }

    let post_instructions;
	console.log(instructions[0]);
	let img_files = []
	img_files.push(thumbnailFile);
	
	if (!(instructions.length==1 && instructions[0]["process_explanation"] == "")) {
		post_instructions = instructions.map((instruction, index) => ({
			process_num: index + 1,
			process_explanation: instruction["process_explanation"],
			img_url: instruction["img_url"],
		}));
		instructions.map((instruction, index) => {
			img_files[index+1] = instruction["file"];
		});
	}
    // // stepTexts を使用して post_instructions を生成
    // if (!(stepCount === 1 && stepTexts[0] === "")) {
    //     post_instructions = stepTexts.map((text, index) => ({
    //     process_num: index + 1,
    //     process_explanation: text,
    //     img_url: null, // 画像のURLはここで設定する必要があります
    //     }));
    // }
	

    const post_data = {
      overview: overview,
      post_name: postName,
      thumbnail_url: thumbnailUrl,
      comment: [
      ],
      post_instruction: post_instructions,
      timestamp: dateStr,
      tag_name: tags,
      like_amount: 0,
    };
    
  console.log("データを送信中");
  // window.alert("データを送信中");
  await AddPost(post_data, img_files);
  console.log("データ送信完了");
  window.alert("データ送信完了");
	
	console.log(post_data);
	console.log("push images = " + img_files);

    // console.log(post_data);

    await navigate("/");

  };

  return (
    <div className='bg-cover bg-center capitalize font-bold' style={{ backgroundImage:`url(${bgp})` }}>
    <Container>
      
      <header className="relative">
        <div id="logo" className="absolute left-5">
          <Link to="/">
            <img src="logo_small.svg" alt="ロゴ" className="w-48"/>
          </Link>
        </div>
        <div className="flex-grow flex justify-center">
        <SearchBar />
        </div>
      </header>

      <main>
        <Container className="container">
          <div className="left-column">

            <Typography variant="h3" color = "secondary">投稿フォーム</Typography>
            

            {/* <form id="recipe-form" action="/post" onSubmit={handleFormSubmit} method="POST" enctype="multipart/form-data"> */}
            <form id="recipe-form" action="/post" method="POST" enctype="multipart/form-data">

              <div class="name-content-file">
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      題名：
                    </label>
                  </div>
                  <div class="md:w-1/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    type="text"
                    value={postName}
                    onChange={(e) => setPostName(e.target.value)}>
                    </input>
                  </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      内容：
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <textarea
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      rows="4"
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}>
                    </textarea>
                  </div>
                </div>

                <div class="upload-container">
                  <label class="block mb-2 text-sm font-medium text-gray-700" for="file_input">Upload file</label>
                  <input class="block mb-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-500 font-bold" 
                    id="file_input" 
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleThumbnailImageFile(e)}></input>
                </div>

                <p class="mt-1 text-sm text-gray-500 dark:text-gray-900 m-4" id="file_input_help">SVG, PNG, JPG or GIF.</p>

                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      タグ：
                    </label>
                  </div>
                  <div
                    id="chips-initial"
                    data-te-chips-initial
                    class="mb-0 min-h-[45px] border-none pb-0 shadow-none outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:cursor-text">
                    {tags.map((tag) => (
                        <Chip
                        key={tag}
                        label={tag}
                        variant="outlined"
                        onDelete={() => removeTag(tag)} // タグを削除する関数を呼び出す
                        className="m-1" // チップの間隔を調整するためのクラス
                      />
                    ))}
                    <input
                      type="text"
                      class="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="contained"color="secondary">
                      Add
                    </Button>
                  </div>
                  {/* <div class="md:w-2/3">
                    <textarea
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      rows="4"
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}>
                    </textarea>
                  </div> */}
                </div>

              </div>

              <hr />
              <br></br>

              <Typography variant="h4" color="secondary">手順</Typography>
              <div class="w-full p-3 m-4">
                <div id="steps">
                  {instructions.map((instruction, index) => (
                    <div class="flex rounded overflow-hidden border shadow shadow-lg m-4 bg-white" key={index}>
                      <div className="step-img">
                        
                        {/* <img class="block h-auto w-full lg:w-48 flex-none bg-cover h-24" src="https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg"></img> */}

						{/* { instruction["img"] && <img class="block h-auto w-full lg:w-48 flex-none bg-cover h-24" src={instruction["img"]} 
                          alt="手順画像" 
                          onClick={() => document.getElementById(`step${index + 1}-image-input`).click()} 
                        />} */}
						{/* { !instruction["img"] &&  */}
						<img class="block h-auto w-full lg:w-48 flex-none bg-cover h-24" src="https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-file-upload-icon-image_1344465.jpg" 
                          alt="手順画像" 
                          onClick={() => document.getElementById(`step${index + 1}-image-input`).click()} 
                        />
						{/* } */}
                        
                        <input
                          type="file"
                          id={`step${index + 1}-image-input`}
                          name={`step${index + 1}-image`}
                          accept="image/*"
                          style={{ display: "none" }} 
                          onChange={(e) => handleAddInstructionImg(e, index)} 
                          required
                        />
                      </div>
                      <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div class="text-black font-bold text-xl mb-2 leading-tight">
                          <span className="step-number">手順{index + 1}:</span>
                        </div>
                      </div>
                      <Input type="text" 
                        id={`step${index + 1}-text`} 
                        name={`step${index + 1}-text`} 
                        size="sm" 
                        required 
                        value={instruction["process_explanation"]}
                        onChange={(e) => {
                        //   const newTexts = [...stepTexts];
                        //   newTexts[index] = e.target.value;
                        //   setStepTexts(newTexts);
						handleAddInstructionText(e, index);
                        }}
                      /> 
                      {index > 0 && (
                        <Button type="button" className="delete-step-button" onClick={() => deleteStep(index + 1)} variant="contained"color="secondary">
                          削除
                        </Button>
                      )}
                    </div>
                  ))}
                </div>   
              
              <Button type="button" id="add-step-button" onClick={addStep} variant="contained"color="secondary">
                + 手順を追加
              </Button>

              </div>
            
            <Link to="/" onClick={handleFormSubmit}>

              <Button type="submit" variant="contained"color="secondary">投稿する</Button>

            </Link>
            </form>
            
            </div>
        </Container>
      </main>
    </Container>
    </div>
  );
}

export default Post;