package team4.slupolyglot.model;

public class RequestJsonPostMapping {


        private String email;
        private String password;
        private String name;

    

        public String getEmail() {
            return email;
        }
        @Override
        public String toString() {
            return "RequestJson [email=" + email + ", password=" + password + ", name=" + name + "]";
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getName() {
            return name;
        }
        public String name() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
}
