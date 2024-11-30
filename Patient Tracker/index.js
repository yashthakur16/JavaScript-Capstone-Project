document.addEventListener('DOMContentLoaded', function () {
      const patientForm = document.getElementById('patientForm');
      const patientTableBody = document.querySelector('#patientTable tbody');

      
      loadFromStorage();
      fetchMockData();

      
      patientForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const bloodGroup = document.getElementById('bloodGroup').value.trim();
        const email = document.getElementById('email').value.trim();

      
        if (!validateInput(name, age, gender, phone, bloodGroup, email)) {
          return;
        }

        
        const patient = { name, age, gender, phone, bloodGroup, email };

        
        addPatientToTable(patient);
        saveToStorage(patient);

        
        showNotification('Patient added successfully!');
        patientForm.reset();
      });

      // Fetch mock data
      function fetchMockData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        xhr.onload = function () {
          if (xhr.status === 200) {
            const patients = JSON.parse(xhr.responseText);
            patients.forEach(patient => {
              addPatientToTable({
                name: patient.name,
                age: 25, 
                gender: 'Male',
                phone: '1234567890', 
                bloodGroup: 'O+', 
                email: patient.email,
              });
            });
          }
        };

        xhr.send();
      }

    
      function addPatientToTable(patient) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td>${patient.phone}</td>
          <td>${patient.bloodGroup}</td>
          <td>${patient.email}</td>
          <td><button class="delete-btn">Delete</button></td>
        `;
        patientTableBody.appendChild(row);

        
        row.querySelector('.delete-btn').addEventListener('click', function () {
          deletePatient(row, patient);
        });
      }

     
      function validateInput(name, age, gender, phone, bloodGroup, email) {
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
          alert('Invalid name format! Only letters and spaces are allowed.');
          return false;
        }
        if (age <= 0 || age > 120 || isNaN(age)) {
          alert('Invalid age! Age must be a number between 1 and 120.');
          return false;
        }
        if (!gender) {
          alert('Please select a gender.');
          return false;
        }
        if (!phoneRegex.test(phone)) {
          alert('Invalid phone number! Must be exactly 10 digits.');
          return false;
        }
        if (!bloodGroup) {
          alert('Please select a blood group.');
          return false;
        }
        if (!emailRegex.test(email)) {
          alert('Invalid email format!');
          return false;
        }
        return true;
      }

     
      function deletePatient(row, patient) {
        
        row.remove();

      
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const updatedPatients = patients.filter(
          p =>
            p.name !== patient.name ||
            p.age !== patient.age ||
            p.email !== patient.email
        );
        localStorage.setItem('patients', JSON.stringify(updatedPatients));

        
        showNotification('Patient deleted successfully!');
      }

      
      function showNotification(message) {
        if (Notification.permission === 'granted') {
          new Notification(message);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification(message);
            }
          });
        }
      }

    
      function saveToStorage(patient) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));
      }

      
      function loadFromStorage() {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients.forEach(patient => {
          addPatientToTable(patient);
        });
      }
    });