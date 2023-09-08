import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { getPostsByTag } from "./getposts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [get_post, setget_post] = useState("");

  const onSubmit = async (data) => {
    console.log(data.text);
    const return_post = await getPostsByTag(data.text);
    setget_post(return_post);
    console.log(return_post);
    navigate(`/search/${data.text}`,{state:{result:return_post,input_text:data.text}});

  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "300px",
          margin: "3rem",
        }}
      >
        <TextField
          {...register("text", { required: true })}
          error={!!errors.nameRequired}
          id="name"
          label="野菜の名前など"
          variant="outlined"
          helperText={!!errors.nameRequired && "名前を入力してください。"}
          style={{
            flex: 1, // ボタンと同じ高さに設定
          }}
        />
        <Box display="flex" alignItems="flex-end">
          <Button variant="contained" color="secondary" type="submit" size="small">
            検索
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default SearchBar;
