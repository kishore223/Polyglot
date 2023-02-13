package team4.slupolyglot;

import org.junit.jupiter.api.Test;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import team4.slupolyglot.model.RequestJsonSignInMapping;
import team4.slupolyglot.model.ResponseJson;
import team4.slupolyglot.model.RequestJsonSignUpMapping;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class SluPolyglotApplicationTests {
   @Autowired
   private MockMvc mockMvc;

   @Test
   public void validateSignInTest() throws Exception {
       RequestJsonSignInMapping requestJsonSignInMapping = new RequestJsonSignInMapping("priyal@gmail.com","Priyal@123");
       ObjectMapper objectMapper = new ObjectMapper();
       String requestJson = objectMapper.writeValueAsString(requestJsonSignInMapping);

       ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/polyglot/player/signIn")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestJson))
               .andExpect(status().isOk());

       ResponseJson responseJson = objectMapper.readValue(resultActions.andReturn().getResponse().getContentAsString(), ResponseJson.class);
       Assert.assertEquals("10200", responseJson.getErrorCode()); 
       Assert.assertEquals("Player sucessfully validated", responseJson.getErrorMessage());
   }

   @Test
   public void validateSignUpTest() throws Exception {
	RequestJsonSignUpMapping requestJsonSignUpMapping = new RequestJsonSignUpMapping("priyal@gmail.com","Priyal@123","Priyal");
       ObjectMapper objectMapper = new ObjectMapper();
       String requestJson = objectMapper.writeValueAsString(requestJsonSignUpMapping);

       ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/polyglot/player/signUp")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestJson))
               .andExpect(status().isOk());

       ResponseJson responseJson = objectMapper.readValue(resultActions.andReturn().getResponse().getContentAsString(), ResponseJson.class);
       Assert.assertEquals("10404", responseJson.getErrorCode()); 
       Assert.assertEquals("user already exsists", responseJson.getErrorMessage());
   }

   @Test
   public void validateSignInFailureTest() throws Exception {
       RequestJsonSignInMapping requestJsonSignInMapping = new RequestJsonSignInMapping("pr@gmail.com","Priyal@123");
       ObjectMapper objectMapper = new ObjectMapper();
       String requestJson = objectMapper.writeValueAsString(requestJsonSignInMapping);

       ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/polyglot/player/signIn")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestJson))
               .andExpect(status().isOk());

       ResponseJson responseJson = objectMapper.readValue(resultActions.andReturn().getResponse().getContentAsString(), ResponseJson.class);
       Assert.assertEquals("10404", responseJson.getErrorCode()); 
       Assert.assertEquals("please check the login credentials", responseJson.getErrorMessage());
   }
   @Test
   public void validateSignUpFailureTest() throws Exception {
	//Add new user every time for sucessfully testing this case
	

	RequestJsonSignUpMapping requestJsonSignUpMapping = new RequestJsonSignUpMapping("piii@gmail.com","il@13","Pri");
       ObjectMapper objectMapper = new ObjectMapper();
       String requestJson = objectMapper.writeValueAsString(requestJsonSignUpMapping);

       ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/polyglot/player/signUp")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestJson))
               .andExpect(status().isOk());

       ResponseJson responseJson = objectMapper.readValue(resultActions.andReturn().getResponse().getContentAsString(), ResponseJson.class);
       Assert.assertEquals("10200", responseJson.getErrorCode()); 
       Assert.assertEquals("User sucessfully created", responseJson.getErrorMessage());
   }

}