import { useState } from "react";
import * as XLSX from "xlsx";
const ROLES = {
  student: {
    title: "Acceso Estudiante",
    icon: "🎓",
    userLabel: "Matrícula",
    userPlaceholder: "Ej. A123456",
    accent: "#0b43a8",
  },
  teacher: {
    title: "Acceso Docente",
    icon: "👨‍🏫",
    userLabel: "Correo institucional",
    userPlaceholder: "docente@escuela.edu.mx",
    accent: "#ff9800",
  },
  admin: {
    title: "Acceso Administrador",
    icon: "🛡️",
    userLabel: "Correo institucional",
    userPlaceholder: "admin@escuela.edu.mx",
    accent: "#292f99",
  },
};

const studentSubjects = [
  {
    name: "Programación",
    group: "8A",
    teacher: "Juan Pérez Martínez",
    schedule: "Lun, Mié y Vie · 08:00 - 10:00",
    classroom: "Laboratorio 3",
    icon: "💻",
    color: "#6935d3",
  },
  {
    name: "Redes",
    group: "8A",
    teacher: "María López Hernández",
    schedule: "Mar y Jue · 10:00 - 12:00",
    classroom: "Aula 201",
    icon: "🌐",
    color: "#159447",
  },
  {
    name: "Base de Datos",
    group: "8A",
    teacher: "Luis Martínez",
    schedule: "Mar y Jue · 13:00 - 15:00",
    classroom: "Laboratorio 2",
    icon: "🗄️",
    color: "#f5a000",
  },
  {
    name: "Sistemas Operativos",
    group: "8A",
    teacher: "Ana Torres",
    schedule: "Viernes · 11:00 - 13:00",
    classroom: "Aula 102",
    icon: "⚙️",
    color: "#0b63ce",
  },
];

const studentAttendance = [
  {
    subject: "Programación",
    date: "20 mayo 2026",
    entry: "09:41 AM",
    exit: "10:00 AM",
    status: "Presente",
  },
  {
    subject: "Redes",
    date: "20 mayo 2026",
    entry: "11:15 AM",
    exit: "12:00 PM",
    status: "Presente",
  },
  {
    subject: "Base de Datos",
    date: "19 mayo 2026",
    entry: "09:35 AM",
    exit: "11:00 AM",
    status: "Retardo",
  },
  {
    subject: "Sistemas Operativos",
    date: "19 mayo 2026",
    entry: "—",
    exit: "—",
    status: "Ausente",
  },
];

const teacherSubjects = [
  {
    id: 1,
    name: "Programación",
    group: "8A",
    schedule: "Lun, Mié y Vie · 08:00 - 10:00",
    classroom: "Laboratorio 3",
    students: 28,
    icon: "💻",
    color: "#6935d3",
    active: true,
  },
  {
    id: 2,
    name: "Redes",
    group: "8B",
    schedule: "Mar y Jue · 10:00 - 12:00",
    classroom: "Aula 201",
    students: 30,
    icon: "🌐",
    color: "#159447",
    active: false,
  },
  {
    id: 3,
    name: "Base de Datos",
    group: "8A",
    schedule: "Mar y Jue · 13:00 - 15:00",
    classroom: "Laboratorio 2",
    students: 26,
    icon: "🗄️",
    color: "#f5a000",
    active: false,
  },
  {
    id: 4,
    name: "Robótica",
    group: "6A",
    schedule: "Viernes · 11:00 - 13:00",
    classroom: "Laboratorio 1",
    students: 22,
    icon: "🤖",
    color: "#0b63ce",
    active: false,
  },
];

const initialTeacherStudents = [
  {
    id: 1,
    name: "María Fernanda López",
    matricula: "A123456",
    specialty: "Ciencias de la Computación",
    thesisDirector: "Dr. Luis Martínez",
    status: "Presente",
    entry: "08:02 AM",
    attendance: 92,
    absences: 1,
    delays: 2,
  },
  {
    id: 2,
    name: "Carlos Hernández Ruiz",
    matricula: "A123457",
    specialty: "Ingeniería de Software",
    thesisDirector: "Dra. Ana Torres",
    status: "Retardo",
    entry: "08:17 AM",
    attendance: 85,
    absences: 2,
    delays: 3,
  },
  {
    id: 3,
    name: "Andrea Martínez Soto",
    matricula: "A123458",
    specialty: "Ciencias de la Computación",
    thesisDirector: "Dr. Luis Martínez",
    status: "Presente",
    entry: "07:58 AM",
    attendance: 96,
    absences: 0,
    delays: 1,
  },
  {
    id: 4,
    name: "José Antonio García",
    matricula: "A123459",
    specialty: "Sistemas Computacionales",
    thesisDirector: "Dra. Laura Sánchez",
    status: "Ausente",
    entry: "—",
    attendance: 72,
    absences: 5,
    delays: 2,
  },
  {
    id: 5,
    name: "Sofía Ramírez Torres",
    matricula: "A123460",
    specialty: "Ingeniería de Software",
    thesisDirector: "Dr. Carlos Méndez",
    status: "Presente",
    entry: "08:05 AM",
    attendance: 90,
    absences: 1,
    delays: 2,
  },
  {
    id: 6,
    name: "Miguel Ángel Flores",
    matricula: "A123461",
    specialty: "Sistemas Computacionales",
    thesisDirector: "Dra. Laura Sánchez",
    status: "Ausente",
    entry: "—",
    attendance: 78,
    absences: 4,
    delays: 1,
  },
];

function App() {
  const [screen, setScreen] = useState("roles");
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const openLogin = (role) => {
    setSelectedRole(role);
    setScreen("login");
    setUser("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleLogin = (event) => {
  event.preventDefault();

  if (!user.trim() || !password.trim()) {
    setError("Completa el usuario y la contraseña.");
    return;
  }

  setError("");

  if (selectedRole === "student") {
    setScreen("studentHome");
    return;
  }

  if (selectedRole === "teacher") {
    setScreen("teacherHome");
    return;
  }

  if (selectedRole === "admin") {
    setScreen("adminHome");
  }
};

const logout = () => {
  setScreen("roles");
  setSelectedRole(null);
  setUser("");
  setPassword("");
  setError("");
};

if (screen === "login" && selectedRole) {
  return (
    <LoginScreen
      config={ROLES[selectedRole]}
      user={user}
      password={password}
      remember={remember}
      showPassword={showPassword}
      error={error}
      setUser={setUser}
      setPassword={setPassword}
      setRemember={setRemember}
      setShowPassword={setShowPassword}
      onSubmit={handleLogin}
      onBack={() => setScreen("roles")}
    />
  );
}

if (screen.startsWith("student")) {
  return (
    <StudentApp
      screen={screen}
      setScreen={setScreen}
      onLogout={logout}
    />
  );
}

if (screen.startsWith("teacher")) {
  return (
    <TeacherApp
      screen={screen}
      setScreen={setScreen}
      onLogout={logout}
    />
  );
}

if (screen.startsWith("admin")) {
  return (
    <AdminApp
      screen={screen}
      setScreen={setScreen}
      onLogout={logout}
    />
  );
}

return <RoleSelection onSelectRole={openLogin} />;
}

function RoleSelection({ onSelectRole }) {
  return (
    <main style={styles.rolePage}>
      <section style={styles.roleContainer}>
        <div style={styles.logo}>⚙️</div>

        <h1 style={styles.mainTitle}>Asistencia Beacons 2</h1>

        <p style={styles.mainSubtitle}>
          Tu asistencia, al instante
        </p>

        <div style={styles.roleButtons}>
          <button
            type="button"
            style={{
              ...styles.roleButton,
              background: "#ffffff",
              color: "#0b43a8",
            }}
            onClick={() => onSelectRole("student")}
          >
            🎓 SOY ESTUDIANTE
          </button>

          <button
            type="button"
            style={{
              ...styles.roleButton,
              background: "#ff9800",
              color: "#ffffff",
            }}
            onClick={() => onSelectRole("teacher")}
          >
            👨‍🏫 SOY PROFESOR
          </button>

          <button
            type="button"
            style={{
              ...styles.roleButton,
              background: "#292f99",
              color: "#ffffff",
            }}
            onClick={() => onSelectRole("admin")}
          >
            🛡️ ADMINISTRADOR
          </button>
        </div>

        <p style={styles.version}>Versión 1.0.0</p>
      </section>
    </main>
  );
}

function LoginScreen({
  config,
  user,
  password,
  remember,
  showPassword,
  error,
  setUser,
  setPassword,
  setRemember,
  setShowPassword,
  onSubmit,
  onBack,
}) {
  return (
    <main style={styles.lightPage}>
      <section style={styles.phonePanel}>
        <header
          style={{
            ...styles.loginHeader,
            background: config.accent,
          }}
        >
          <button
            type="button"
            style={styles.headerButton}
            onClick={onBack}
          >
            ←
          </button>

          <strong>{config.title}</strong>

          <span style={{ width: "36px" }} />
        </header>

        <div style={styles.loginBody}>
          <div
            style={{
              ...styles.loginIcon,
              background: `${config.accent}18`,
            }}
          >
            {config.icon}
          </div>

          <h2 style={styles.loginTitle}>Iniciar sesión</h2>

          <p style={styles.mutedText}>
            Ingresa tus datos para continuar.
          </p>

          <form style={styles.form} onSubmit={onSubmit}>
            <label style={styles.label}>
              {config.userLabel}

              <input
                style={styles.input}
                type={
                  config.userLabel.includes("Correo")
                    ? "email"
                    : "text"
                }
                placeholder={config.userPlaceholder}
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </label>

            <label style={styles.label}>
              Contraseña

              <div style={styles.passwordWrapper}>
                <input
                  style={{
                    ...styles.input,
                    paddingRight: "50px",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  style={styles.passwordButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) =>
                  setRemember(event.target.checked)
                }
              />
              Recordar sesión
            </label>

            {error && <p style={styles.errorText}>{error}</p>}

            <button
              type="submit"
              style={{
                ...styles.primaryButton,
                background: config.accent,
              }}
            >
              INGRESAR
            </button>
          </form>

          <button type="button" style={styles.linkButton}>
            ¿Olvidaste tu contraseña?
          </button>

          <p style={styles.prototypeNote}>
            Prototipo: puedes utilizar cualquier dato.
          </p>
        </div>
      </section>
    </main>
  );
}

/* =======================
   ESTUDIANTE
======================= */

function StudentApp({ screen, setScreen, onLogout }) {
  const titles = {
    studentHome: "Inicio",
    studentProfile: "Mi Perfil",
    studentAttendance: "Mis Asistencias",
    studentSubjects: "Materias Inscritas",
    studentBeacon: "Asistencia Automática",
  };

  return (
    <MobileLayout
      title={titles[screen]}
      color="#0b43a8"
      showBack={screen !== "studentHome"}
      onBack={() => setScreen("studentHome")}
    >
      {screen === "studentHome" && (
        <StudentHome
          setScreen={setScreen}
          onLogout={onLogout}
        />
      )}

      {screen === "studentProfile" && <StudentProfile />}

      {screen === "studentAttendance" && (
        <StudentAttendance />
      )}

      {screen === "studentSubjects" && <StudentSubjects />}

      {screen === "studentBeacon" && <StudentBeacon />}

      <BottomNavigation
        color="#0b43a8"
        active={screen}
        items={[
          ["studentHome", "🏠", "Inicio"],
          ["studentBeacon", "📡", "Asistencia"],
          ["studentProfile", "👤", "Perfil"],
        ]}
        setScreen={setScreen}
      />
    </MobileLayout>
  );
}

function StudentHome({ setScreen, onLogout }) {
  return (
    <>
      <article style={styles.profileCard}>
        <div style={styles.avatar}>👩‍🎓</div>

        <div>
          <p style={styles.blueLabel}>¡Bienvenida!</p>
          <h2 style={styles.cardTitle}>María Fernanda</h2>
          <p style={styles.mutedText}>Matrícula A123456</p>
        </div>
      </article>

      <article style={styles.bluetoothCard}>
        <span>📶 Bluetooth</span>
        <strong style={{ color: "#159447" }}>Activo ●</strong>
      </article>

      <div style={styles.grid}>
        <MenuCard
          icon="👤"
          label="Mi Perfil"
          onClick={() => setScreen("studentProfile")}
        />

        <MenuCard
          icon="📅"
          label="Mis Asistencias"
          onClick={() => setScreen("studentAttendance")}
        />

        <MenuCard
          icon="📚"
          label="Materias Inscritas"
          onClick={() => setScreen("studentSubjects")}
        />

        <MenuCard
          icon="📡"
          label="Asistencia Automática"
          onClick={() => setScreen("studentBeacon")}
        />
      </div>

      <LogoutButton onLogout={onLogout} />
    </>
  );
}

function StudentProfile() {
  const information = [
    ["🎓", "Especialidad", "Ciencias de la Computación"],
    ["📘", "Semestre", "8°"],
    ["👥", "Grupo", "8A"],
    ["👨‍💼", "Director de Carrera", "Dr. Juan Pérez"],
    ["👨‍🏫", "Director de Tesis", "Dr. Luis Martínez"],
    ["✉️", "Correo", "maria.lopez@escuela.edu.mx"],
  ];

  return (
    <>
      <article style={styles.profileCard}>
        <div style={styles.largeAvatar}>👩‍🎓</div>

        <div>
          <h2 style={styles.cardTitle}>
            María Fernanda López
          </h2>
          <p style={styles.mutedText}>A123456</p>
        </div>
      </article>

      <article style={styles.whiteCard}>
        {information.map(([icon, label, value]) => (
          <InformationRow
            key={label}
            icon={icon}
            label={label}
            value={value}
          />
        ))}
      </article>

      <h3 style={styles.sectionTitle}>Materias inscritas</h3>

      <div style={styles.chipContainer}>
        {studentSubjects.map((subject) => (
          <span style={styles.chip} key={subject.name}>
            {subject.name}
          </span>
        ))}
      </div>
    </>
  );
}

function StudentAttendance() {
  const [filter, setFilter] = useState("Todos");

  const records =
    filter === "Todos"
      ? studentAttendance
      : studentAttendance.filter(
          (item) => item.status === filter,
        );

  return (
    <>
      <FilterButtons
        selected={filter}
        setSelected={setFilter}
        options={["Todos", "Presente", "Retardo", "Ausente"]}
        color="#0b43a8"
      />

      <div style={styles.list}>
        {records.map((item, index) => (
          <AttendanceCard
            key={`${item.subject}-${index}`}
            title={item.subject}
            subtitle={item.date}
            detail={`Entrada: ${item.entry} · Salida: ${item.exit}`}
            status={item.status}
          />
        ))}
      </div>

      <article style={styles.summaryGrid}>
        <SummaryValue value="85%" label="Asistencia general" />
        <SummaryValue value="17" label="Clases registradas" />
      </article>
    </>
  );
}

function StudentSubjects() {
  return (
    <div style={styles.list}>
      {studentSubjects.map((subject) => (
        <article style={styles.subjectCard} key={subject.name}>
          <div
            style={{
              ...styles.subjectIcon,
              background: `${subject.color}18`,
            }}
          >
            {subject.icon}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={styles.smallTitle}>
              {subject.name} ({subject.group})
            </h3>
            <p style={styles.smallText}>
              Profesor: {subject.teacher}
            </p>
            <p style={styles.smallText}>
              🕐 {subject.schedule}
            </p>
            <p style={styles.smallText}>
              📍 {subject.classroom}
            </p>
          </div>

          <span>›</span>
        </article>
      ))}
    </div>
  );
}

function StudentBeacon() {
  const [processing, setProcessing] = useState(false);
  const [registered, setRegistered] = useState(false);

  const detect = () => {
    setProcessing(true);
    setRegistered(false);

    window.setTimeout(() => {
      setProcessing(false);
      setRegistered(true);
    }, 1800);
  };

  return (
    <>
      <article style={{ ...styles.whiteCard, textAlign: "center" }}>
        <div style={{ fontSize: "60px" }}>📡</div>
        <h2 style={styles.cardTitle}>
          {processing
            ? "Buscando Beacons..."
            : registered
              ? "Asistencia registrada"
              : "Listo para detectar"}
        </h2>
        <p style={styles.mutedText}>
          Mantén activo el Bluetooth y permanece dentro del aula.
        </p>
      </article>

      <article style={styles.whiteCard}>
        {[
          "Buscando Beacons cercanos",
          "Beacon del aula detectado",
          "Validando aula correcta",
          "Validando horario de clase",
          "Registrando asistencia",
        ].map((step, index) => (
          <div style={styles.stepRow} key={step}>
            <span
              style={{
                ...styles.stepCircle,
                background:
                  registered || (processing && index === 0)
                    ? "#159447"
                    : "#dfe5ef",
                color:
                  registered || (processing && index === 0)
                    ? "#ffffff"
                    : "#667085",
              }}
            >
              {registered ? "✓" : index + 1}
            </span>

            <span style={{ flex: 1 }}>{step}</span>

            <strong>
              {registered ? "✓" : processing && index === 0 ? "…" : "—"}
            </strong>
          </div>
        ))}
      </article>

      {registered ? (
        <article style={styles.successCard}>
          ✅ Asistencia registrada correctamente a las 09:41 AM
        </article>
      ) : (
        <button
          type="button"
          style={{
            ...styles.primaryButton,
            background: "#0b43a8",
            marginTop: "16px",
          }}
          onClick={detect}
          disabled={processing}
        >
          {processing ? "DETECTANDO..." : "INICIAR DETECCIÓN"}
        </button>
      )}

      <p style={styles.prototypeNote}>
        La detección es simulada en esta versión.
      </p>
    </>
  );
}

/* =======================
   PROFESOR
======================= */

function TeacherApp({ screen, setScreen, onLogout }) {
  const [selectedSubject, setSelectedSubject] = useState(
    teacherSubjects[0],
  );

  const [selectedStudent, setSelectedStudent] = useState(
    initialTeacherStudents[0],
  );

  const [students, setStudents] = useState(
    initialTeacherStudents,
  );

  const titles = {
    teacherHome: "Mis Materias",
    teacherAttendance: "Lista de Asistencia",
    teacherStudent: "Detalle del Alumno",
    teacherReports: "Reportes",
    teacherEditSearch: "Editar Asistencias",
    teacherEditForm: "Modificar Asistencia",
  };

  const openAttendance = (subject) => {
    setSelectedSubject(subject);
    setScreen("teacherAttendance");
  };

  const openStudent = (student) => {
    setSelectedStudent(student);
    setScreen("teacherStudent");
  };

  const openEditForm = (student, subject) => {
    setSelectedStudent(student);
    setSelectedSubject(subject);
    setScreen("teacherEditForm");
  };

  const updateStudentAttendance = (updatedStudent) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student,
      ),
    );

    setSelectedStudent(updatedStudent);
  };

  const handleBack = () => {
    if (screen === "teacherStudent") {
      setScreen("teacherAttendance");
      return;
    }

    if (screen === "teacherEditForm") {
      setScreen("teacherEditSearch");
      return;
    }

    setScreen("teacherHome");
  };

  return (
    <MobileLayout
      title={titles[screen]}
      color="#0b43a8"
      showBack={screen !== "teacherHome"}
      onBack={handleBack}
    >
      {screen === "teacherHome" && (
        <TeacherHome
          openAttendance={openAttendance}
          setScreen={setScreen}
          onLogout={onLogout}
        />
      )}

      {screen === "teacherAttendance" && (
        <TeacherAttendance
          subject={selectedSubject}
          students={students}
          setStudents={setStudents}
          openStudent={openStudent}
        />
      )}

      {screen === "teacherStudent" && (
        <TeacherStudentDetail
          student={selectedStudent}
          onEdit={() =>
            openEditForm(selectedStudent, selectedSubject)
          }
        />
      )}

      {screen === "teacherReports" && <TeacherReports />}

      {screen === "teacherEditSearch" && (
        <TeacherEditAttendanceSearch
          students={students}
          onEditStudent={openEditForm}
        />
      )}

      {screen === "teacherEditForm" && (
        <TeacherEditAttendanceForm
          student={selectedStudent}
          subject={selectedSubject}
          onSave={updateStudentAttendance}
          onCancel={() => setScreen("teacherEditSearch")}
        />
      )}

      <BottomNavigation
        color="#0b43a8"
        active={screen}
        items={[
          ["teacherHome", "📚", "Materias"],
          ["teacherEditSearch", "✏️", "Editar"],
          ["teacherReports", "📊", "Reportes"],
        ]}
        setScreen={setScreen}
      />
    </MobileLayout>
  );
}

function TeacherHome({
  openAttendance,
  setScreen,
  onLogout,
}) {
  return (
    <>
      <article style={styles.profileCard}>
        <div style={styles.avatar}>👨‍🏫</div>

        <div>
          <p style={styles.blueLabel}>¡Bienvenido!</p>
          <h2 style={styles.cardTitle}>
            Juan Pérez Martínez
          </h2>
          <p style={styles.mutedText}>
            Docente · Ciencias Computacionales
          </p>
        </div>
      </article>

      <article style={styles.nextClassCard}>
        <div>
          <small>PRÓXIMA CLASE</small>
          <h3 style={{ margin: "7px 0" }}>
            Programación · Grupo 8A
          </h3>
          <p style={{ margin: 0 }}>
            Hoy · 08:00 a 10:00 · Laboratorio 3
          </p>
        </div>

        <span style={{ fontSize: "32px" }}>🕐</span>
      </article>

      <h3 style={styles.sectionTitle}>Materias asignadas</h3>

      <div style={styles.list}>
        {teacherSubjects.map((subject) => (
          <button
            type="button"
            style={styles.teacherSubjectCard}
            key={subject.id}
            onClick={() => openAttendance(subject)}
          >
            <div
              style={{
                ...styles.subjectIcon,
                background: `${subject.color}18`,
              }}
            >
              {subject.icon}
            </div>

            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.subjectTitleRow}>
                <h3 style={styles.smallTitle}>
                  {subject.name} ({subject.group})
                </h3>

                {subject.active && (
                  <span style={styles.activeClassBadge}>
                    EN CURSO
                  </span>
                )}
              </div>

              <p style={styles.smallText}>
                🕐 {subject.schedule}
              </p>

              <p style={styles.smallText}>
                📍 {subject.classroom}
              </p>

              <p style={styles.smallText}>
                👥 {subject.students} estudiantes
              </p>
            </div>

            <span>›</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        style={{
          ...styles.secondaryButton,
          marginTop: "16px",
        }}
        onClick={() => setScreen("teacherReports")}
      >
        📊 Consultar reportes
      </button>

      <LogoutButton onLogout={onLogout} />
    </>
  );
}

function TeacherAttendance({
  subject,
  students,
  setStudents,
  openStudent,
}) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesFilter =
      filter === "Todos" || student.status === filter;

    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.matricula
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const counts = {
    Presente: students.filter(
      (student) => student.status === "Presente",
    ).length,
    Retardo: students.filter(
      (student) => student.status === "Retardo",
    ).length,
    Ausente: students.filter(
      (student) => student.status === "Ausente",
    ).length,
  };

  const changeStatus = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        const nextStatus =
          student.status === "Presente"
            ? "Retardo"
            : student.status === "Retardo"
              ? "Ausente"
              : "Presente";

        return {
          ...student,
          status: nextStatus,
          entry:
            nextStatus === "Ausente"
              ? "—"
              : nextStatus === "Retardo"
                ? "08:17 AM"
                : "08:02 AM",
        };
      }),
    );
  };

  return (
    <>
      <article style={styles.classInformationCard}>
        <div>
          <h2 style={styles.cardTitle}>
            {subject.name} · {subject.group}
          </h2>
          <p style={styles.mutedText}>
            {subject.schedule}
          </p>
          <p style={styles.mutedText}>
            📍 {subject.classroom}
          </p>
        </div>

        <span style={styles.liveBadge}>● EN VIVO</span>
      </article>

      <article style={styles.attendanceCounters}>
        <Counter
          value={counts.Presente}
          label="Presentes"
          color="#159447"
        />

        <Counter
          value={counts.Retardo}
          label="Retardos"
          color="#d98a00"
        />

        <Counter
          value={counts.Ausente}
          label="Ausentes"
          color="#d42f2f"
        />
      </article>

      <input
        style={styles.searchInput}
        placeholder="🔍 Buscar por nombre o matrícula"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <FilterButtons
        selected={filter}
        setSelected={setFilter}
        options={["Todos", "Presente", "Retardo", "Ausente"]}
        color="#0b43a8"
      />

      <p style={styles.statusHelp}>
        Presiona el indicador de color para cambiar manualmente el
        estado.
      </p>

      <div style={styles.list}>
        {filteredStudents.map((student) => {
          const status = getStatusStyle(student.status);

          return (
            <article style={styles.teacherStudentCard} key={student.id}>
              <button
                type="button"
                style={{
                  ...styles.statusCircle,
                  background: status.color,
                }}
                onClick={() => changeStatus(student.id)}
                title="Cambiar estado"
              />

              <button
                type="button"
                style={styles.studentInformationButton}
                onClick={() => openStudent(student)}
              >
                <strong>{student.name}</strong>

                <span>{student.matricula}</span>

                <small>
                  Entrada: {student.entry}
                </small>
              </button>

              <span
                style={{
                  ...styles.statusBadge,
                  color: status.color,
                  background: status.background,
                }}
              >
                {student.status}
              </span>

              <button
                type="button"
                style={styles.arrowButton}
                onClick={() => openStudent(student)}
              >
                ›
              </button>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        style={{
          ...styles.primaryButton,
          background: "#0b43a8",
          marginTop: "16px",
        }}
        onClick={() =>
          window.alert(
            "Lista de asistencia guardada correctamente.",
          )
        }
      >
        GUARDAR LISTA
      </button>
    </>
  );
}

function TeacherStudentDetail({ student, onEdit }) {
  const history = [
    {
      date: "20 mayo 2026",
      status: student.status,
      entry: student.entry,
    },
    {
      date: "18 mayo 2026",
      status: "Presente",
      entry: "08:01 AM",
    },
    {
      date: "15 mayo 2026",
      status: "Retardo",
      entry: "08:16 AM",
    },
    {
      date: "13 mayo 2026",
      status: "Presente",
      entry: "07:59 AM",
    },
  ];

  return (
    <>
      <article style={styles.studentDetailHeader}>
        <div style={styles.largeAvatar}>👩‍🎓</div>

        <div style={{ flex: 1 }}>
          <h2 style={styles.cardTitle}>{student.name}</h2>

          <p style={styles.mutedText}>
            Matrícula: {student.matricula}
          </p>
        </div>

        <AttendancePercentage value={student.attendance} />
      </article>

      <article style={styles.whiteCard}>
        <InformationRow
          icon="🎓"
          label="Especialidad"
          value={student.specialty}
        />

        <InformationRow
          icon="👨‍🏫"
          label="Director de tesis"
          value={student.thesisDirector}
        />

        <InformationRow
          icon="📚"
          label="Materia"
          value="Programación · Grupo 8A"
        />
      </article>

      <article style={styles.summaryGrid}>
        <SummaryValue
          value={`${student.attendance}%`}
          label="Asistencia"
        />

        <SummaryValue
          value={student.delays}
          label="Retardos"
        />

        <SummaryValue
          value={student.absences}
          label="Faltas"
        />
      </article>

      <h3 style={styles.sectionTitle}>
        Historial en la materia
      </h3>

      <div style={styles.list}>
        {history.map((record, index) => (
          <AttendanceCard
            key={`${record.date}-${index}`}
            title={record.date}
            subtitle={`Entrada: ${record.entry}`}
            detail="Programación · Grupo 8A"
            status={record.status}
          />
        ))}
      </div>

      <button
        type="button"
        style={{
          ...styles.primaryButton,
          background: "#0b43a8",
          marginTop: "16px",
        }}
        onClick={onEdit}
      >
        ✏️ EDITAR ASISTENCIA
      </button>
    </>
  );
}

function TeacherEditAttendanceSearch({
  students,
  onEditStudent,
}) {
  const [selectedSubjectId, setSelectedSubjectId] =
    useState("all");

  const [selectedStatus, setSelectedStatus] =
    useState("Todos");

  const [selectedDate, setSelectedDate] =
    useState("2026-05-20");

  const [search, setSearch] = useState("");

  const visibleSubjects =
    selectedSubjectId === "all"
      ? teacherSubjects
      : teacherSubjects.filter(
          (subject) =>
            String(subject.id) === selectedSubjectId,
        );

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.matricula
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "Todos" ||
      student.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <article style={styles.editSearchIntroduction}>
        <div style={styles.editSearchIcon}>✏️</div>

        <div>
          <h2 style={styles.cardTitle}>
            Buscar asistencia
          </h2>

          <p style={styles.mutedText}>
            Selecciona la materia y localiza al estudiante.
          </p>
        </div>
      </article>

      <article style={styles.whiteCard}>
        <label style={styles.fieldLabel}>
          Materia

          <select
            style={styles.selectInput}
            value={selectedSubjectId}
            onChange={(event) =>
              setSelectedSubjectId(event.target.value)
            }
          >
            <option value="all">
              Todas mis materias
            </option>

            {teacherSubjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name} · Grupo {subject.group}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.fieldLabel}>
          Fecha de asistencia

          <input
            style={styles.input}
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
          />
        </label>

        <label style={styles.fieldLabel}>
          Buscar estudiante

          <input
            style={styles.input}
            type="text"
            placeholder="Nombre o matrícula"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </label>
      </article>

      <FilterButtons
        selected={selectedStatus}
        setSelected={setSelectedStatus}
        options={[
          "Todos",
          "Presente",
          "Retardo",
          "Ausente",
        ]}
        color="#0b43a8"
      />

      <div style={styles.selectedFiltersCard}>
        <span>📚</span>

        <div>
          <strong>
            {selectedSubjectId === "all"
              ? "Todas las materias"
              : visibleSubjects[0]?.name}
          </strong>

          <p style={styles.smallText}>
            Fecha: {formatPrototypeDate(selectedDate)}
          </p>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>
        Resultados ({filteredStudents.length})
      </h3>

      <div style={styles.list}>
        {filteredStudents.map((student) => {
          const statusStyle = getStatusStyle(
            student.status,
          );

          return (
            <article
              style={styles.editStudentResultCard}
              key={student.id}
            >
              <div style={styles.smallStudentAvatar}>
                👩‍🎓
              </div>

              <div style={{ flex: 1 }}>
                <strong style={styles.resultStudentName}>
                  {student.name}
                </strong>

                <p style={styles.smallText}>
                  {student.matricula}
                </p>

                <p style={styles.smallText}>
                  Entrada: {student.entry}
                </p>
              </div>

              <div style={styles.editResultActions}>
                <span
                  style={{
                    ...styles.statusBadge,
                    color: statusStyle.color,
                    background:
                      statusStyle.background,
                  }}
                >
                  {student.status}
                </span>

                <button
                  type="button"
                  style={styles.smallEditButton}
                  onClick={() =>
                    onEditStudent(
                      student,
                      selectedSubjectId === "all"
                        ? teacherSubjects[0]
                        : visibleSubjects[0],
                    )
                  }
                >
                  Editar
                </button>
              </div>
            </article>
          );
        })}

        {filteredStudents.length === 0 && (
          <article style={styles.emptyState}>
            <div style={{ fontSize: "42px" }}>🔍</div>

            <strong>
              No encontramos estudiantes
            </strong>

            <p style={styles.mutedText}>
              Revisa la búsqueda o cambia los filtros.
            </p>
          </article>
        )}
      </div>
    </>
  );
}

function TeacherEditAttendanceForm({
  student,
  subject,
  onSave,
  onCancel,
}) {
  const [status, setStatus] = useState(student.status);
  const [entryTime, setEntryTime] = useState(
    student.entry === "—"
      ? ""
      : convertPrototypeTime(student.entry),
  );

  const [exitTime, setExitTime] = useState("10:00");
  const [reason, setReason] = useState("");
  const [observations, setObservations] =
    useState("");

  const [saved, setSaved] = useState(false);

  const saveAttendance = () => {
    const updatedStudent = {
      ...student,
      status,
      entry:
        status === "Ausente"
          ? "—"
          : formatPrototypeTime(entryTime),
    };

    onSave(updatedStudent);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <>
      <article style={styles.studentEditHeader}>
        <div style={styles.largeAvatar}>👩‍🎓</div>

        <div>
          <h2 style={styles.cardTitle}>
            {student.name}
          </h2>

          <p style={styles.mutedText}>
            Matrícula: {student.matricula}
          </p>

          <p style={styles.mutedText}>
            {subject.name} · Grupo {subject.group}
          </p>
        </div>
      </article>

      <article style={styles.auditCard}>
        <strong>Registro seleccionado</strong>

        <p style={styles.smallText}>
          📅 20 mayo 2026
        </p>

        <p style={styles.smallText}>
          🕐 {subject.schedule}
        </p>

        <p style={styles.smallText}>
          📍 {subject.classroom}
        </p>
      </article>

      <article style={styles.whiteCard}>
        <p style={styles.fieldTitle}>
          Estado de asistencia
        </p>

        <div style={styles.attendanceOptionGrid}>
          {[
            ["Presente", "✅"],
            ["Retardo", "🕐"],
            ["Ausente", "❌"],
            ["Justificada", "📄"],
          ].map(([option, icon]) => {
            const active = status === option;

            return (
              <button
                type="button"
                key={option}
                style={{
                  ...styles.attendanceOption,
                  ...(active
                    ? styles.attendanceOptionActive
                    : {}),
                }}
                onClick={() => setStatus(option)}
              >
                <span style={{ fontSize: "25px" }}>
                  {icon}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>

        <div style={styles.timeGrid}>
          <label style={styles.fieldLabel}>
            Hora de entrada

            <input
              style={styles.input}
              type="time"
              value={entryTime}
              disabled={status === "Ausente"}
              onChange={(event) =>
                setEntryTime(event.target.value)
              }
            />
          </label>

          <label style={styles.fieldLabel}>
            Hora de salida

            <input
              style={styles.input}
              type="time"
              value={exitTime}
              disabled={status === "Ausente"}
              onChange={(event) =>
                setExitTime(event.target.value)
              }
            />
          </label>
        </div>

        <label style={styles.fieldLabel}>
          Motivo del cambio

          <select
            style={styles.selectInput}
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
          >
            <option value="">
              Selecciona un motivo
            </option>

            <option value="correccion">
              Corrección del registro
            </option>

            <option value="justificante">
              Justificante presentado
            </option>

            <option value="falla-beacon">
              Falla en la detección del Beacon
            </option>

            <option value="captura-manual">
              Captura manual del profesor
            </option>

            <option value="otro">Otro</option>
          </select>
        </label>

        <label style={styles.fieldLabel}>
          Observaciones

          <textarea
            style={styles.textareaInput}
            placeholder="Escribe una observación opcional"
            value={observations}
            onChange={(event) =>
              setObservations(event.target.value)
            }
          />
        </label>
      </article>

      <article style={styles.changeAuditCard}>
        <span>🛡️</span>

        <div>
          <strong>Registro de auditoría</strong>

          <p style={styles.smallText}>
            El cambio quedará registrado a nombre de:
          </p>

          <p style={styles.smallText}>
            Juan Pérez Martínez · Profesor
          </p>
        </div>
      </article>

      {saved && (
        <article style={styles.successCard}>
          ✅ Los cambios fueron guardados correctamente.
        </article>
      )}

      <div style={styles.formActionGrid}>
        <button
          type="button"
          style={styles.cancelButton}
          onClick={onCancel}
        >
          CANCELAR
        </button>

        <button
          type="button"
          style={{
            ...styles.primaryButton,
            background: "#0b43a8",
          }}
          onClick={saveAttendance}
        >
          GUARDAR CAMBIOS
        </button>
      </div>
    </>
  );
}

function TeacherReports() {
  const reportSubjects = [
    {
      name: "Programación 8A",
      attendance: 89,
      present: 25,
      delays: 2,
      absent: 1,
    },
    {
      name: "Redes 8B",
      attendance: 84,
      present: 25,
      delays: 3,
      absent: 2,
    },
    {
      name: "Base de Datos 8A",
      attendance: 91,
      present: 24,
      delays: 1,
      absent: 1,
    },
    {
      name: "Robótica 6A",
      attendance: 87,
      present: 19,
      delays: 2,
      absent: 1,
    },
  ];

  return (
    <>
      <article style={styles.reportSummary}>
        <h2 style={{ margin: "0 0 6px" }}>
          Resumen del periodo
        </h2>

        <p style={styles.mutedText}>
          Mayo 2026 · Todas las materias
        </p>

        <strong style={styles.bigPercentage}>88%</strong>

        <span style={styles.mutedText}>
          Asistencia promedio
        </span>
      </article>

      <article style={styles.attendanceCounters}>
        <Counter
          value="93"
          label="Presentes"
          color="#159447"
        />

        <Counter
          value="8"
          label="Retardos"
          color="#d98a00"
        />

        <Counter
          value="5"
          label="Ausencias"
          color="#d42f2f"
        />
      </article>

      <h3 style={styles.sectionTitle}>
        Rendimiento por materia
      </h3>

      <div style={styles.list}>
        {reportSubjects.map((subject) => (
          <article style={styles.reportCard} key={subject.name}>
            <div style={styles.reportTitleRow}>
              <strong>{subject.name}</strong>

              <strong style={{ color: "#0b43a8" }}>
                {subject.attendance}%
              </strong>
            </div>

            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${subject.attendance}%`,
                }}
              />
            </div>

            <div style={styles.reportDetails}>
              <span style={{ color: "#159447" }}>
                {subject.present} presentes
              </span>

              <span style={{ color: "#d98a00" }}>
                {subject.delays} retardos
              </span>

              <span style={{ color: "#d42f2f" }}>
                {subject.absent} ausentes
              </span>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        style={{
          ...styles.primaryButton,
          background: "#0b43a8",
          marginTop: "16px",
        }}
        onClick={() =>
          window.alert(
            "En la aplicación final se generará el reporte en PDF o Excel.",
          )
        }
      >
        📥 EXPORTAR REPORTE
      </button>
    </>
  );
}

/* =======================
   ADMINISTRADOR
======================= */

const initialAdminStudents = [
  {
    id: 1,
    name: "María Fernanda López",
    matricula: "A123456",
    email: "maria.lopez@escuela.edu.mx",
    group: "8A",
    subjects: ["Programación", "Redes", "Base de Datos"],
    accountStatus: "Pendiente",
  },
  {
    id: 2,
    name: "Carlos Hernández Ruiz",
    matricula: "A123457",
    email: "carlos.hernandez@escuela.edu.mx",
    group: "8A",
    subjects: ["Programación", "Redes"],
    accountStatus: "Activo",
  },
  {
    id: 3,
    name: "Andrea Martínez Soto",
    matricula: "A123458",
    email: "andrea.martinez@escuela.edu.mx",
    group: "8A",
    subjects: ["Programación", "Base de Datos"],
    accountStatus: "Activo",
  },
];

const initialAdminTeachers = [
  {
    id: 1,
    name: "Juan Pérez Martínez",
    email: "juan.perez@escuela.edu.mx",
    positions: ["Profesor", "Director de carrera"],
    subjects: ["Programación 8A", "Redes 8B"],
    accountStatus: "Pendiente",
  },
  {
    id: 2,
    name: "Ana Torres López",
    email: "ana.torres@escuela.edu.mx",
    positions: ["Profesora", "Directora de tesis"],
    subjects: ["Base de Datos 8A"],
    accountStatus: "Activo",
  },
];

function AdminApp({ screen, setScreen, onLogout }) {
  const [students, setStudents] = useState(initialAdminStudents);
  const [teachers, setTeachers] = useState(initialAdminTeachers);

  const titles = {
    adminHome: "Panel Administrador",
    adminImport: "Importar Información",
    adminStudents: "Administrar Alumnos",
    adminTeachers: "Administrar Profesores",
    adminAssignments: "Asignaciones",
  };

  const handleBack = () => {
    setScreen("adminHome");
  };

  return (
  <MobileLayout
    title={titles[screen] || "Panel Administrador"}
    color="#292f99"
    showBack={screen !== "adminHome"}
    onBack={handleBack}
  >
    {screen === "adminHome" && (
      <AdminHome
        students={students}
        teachers={teachers}
        setScreen={setScreen}
        onLogout={onLogout}
      />
    )}

    {screen === "adminImport" && (
      <AdminImportData
        students={students}
        setStudents={setStudents}
        teachers={teachers}
        setTeachers={setTeachers}
      />
    )}

    {screen === "adminStudents" && (
      <AdminStudents
        students={students}
        setStudents={setStudents}
      />
    )}

    {screen === "adminTeachers" && (
      <AdminTeachers
        teachers={teachers}
        setTeachers={setTeachers}
      />
    )}

    {screen === "adminAssignments" && (
      <AdminAssignments
        students={students}
        teachers={teachers}
      />
    )}

    <BottomNavigation
      color="#292f99"
      active={screen}
      items={[
        ["adminHome", "🏠", "Inicio"],
        ["adminImport", "📥", "Importar"],
        ["adminStudents", "🎓", "Alumnos"],
        ["adminTeachers", "👨‍🏫", "Profesores"],
      ]}
      setScreen={setScreen}
    />
  </MobileLayout>
);
}

function AdminHome({
  students,
  teachers,
  setScreen,
  onLogout,
}) {
  const activeStudents = students.filter(
    (student) => student.accountStatus === "Activo",
  ).length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.accountStatus === "Activo",
  ).length;

  return (
    <>
      <article style={styles.profileCard}>
        <div style={styles.avatar}>🛡️</div>

        <div>
          <p style={styles.blueLabel}>Centro de control</p>

          <h2 style={styles.cardTitle}>
            Administrador
          </h2>

          <p style={styles.mutedText}>
            Gestión de usuarios y asignaciones
          </p>
        </div>
      </article>

      <article style={styles.attendanceCounters}>
        <Counter
          value={students.length}
          label="Alumnos"
          color="#0b43a8"
        />

        <Counter
          value={teachers.length}
          label="Profesores"
          color="#ff9800"
        />

        <Counter
          value={activeStudents + activeTeachers}
          label="Cuentas activas"
          color="#159447"
        />
      </article>

      <h3 style={styles.sectionTitle}>
        Administración
      </h3>

      <div style={styles.grid}>
        <MenuCard
          icon="📥"
          label="Importar información"
          onClick={() => setScreen("adminImport")}
        />

        <MenuCard
          icon="🎓"
          label="Administrar alumnos"
          onClick={() => setScreen("adminStudents")}
        />

        <MenuCard
          icon="👨‍🏫"
          label="Administrar profesores"
          onClick={() => setScreen("adminTeachers")}
        />

        <MenuCard
          icon="🔗"
          label="Asignaciones"
          onClick={() => setScreen("adminAssignments")}
        />
      </div>

      <article style={styles.whiteCard}>
        <h3 style={styles.smallTitle}>
          Estado de las cuentas
        </h3>

        <InformationRow
          icon="🎓"
          label="Alumnos activos"
          value={`${activeStudents} de ${students.length}`}
        />

        <InformationRow
          icon="👨‍🏫"
          label="Profesores activos"
          value={`${activeTeachers} de ${teachers.length}`}
        />

        <InformationRow
          icon="🔐"
          label="Activaciones pendientes"
          value={
            students.filter(
              (student) =>
                student.accountStatus === "Pendiente",
            ).length +
            teachers.filter(
              (teacher) =>
                teacher.accountStatus === "Pendiente",
            ).length
          }
        />
      </article>

      <LogoutButton onLogout={onLogout} />
    </>
  );
}

function AdminImportData({
  students,
  setStudents,
  teachers,
  setTeachers,
}) {
  const [dataType, setDataType] = useState("students");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const readFile = async (file) => {
    if (!file) {
      return;
    }

    setFileName(file.name);
    setPreview([]);
    setMessage("");
    setMessageType("");

    try {
      const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();

      let rows = [];

      if (extension === "tsv") {
        const text = await file.text();

        const lines = text
          .split(/\r?\n/)
          .filter((line) => line.trim() !== "");

        if (lines.length < 2) {
          throw new Error(
            "El archivo TSV no contiene registros.",
          );
        }

        const headers = lines[0]
          .split("\t")
          .map((header) => header.trim());

        rows = lines.slice(1).map((line) => {
          const values = line.split("\t");

          return headers.reduce(
            (record, header, index) => {
              record[header] =
                values[index]?.trim() || "";

              return record;
            },
            {},
          );
        });
      } else if (
        extension === "xlsx" ||
        extension === "xls"
      ) {
        const buffer = await file.arrayBuffer();

        const workbook = XLSX.read(buffer, {
          type: "array",
        });

        const firstSheet =
          workbook.Sheets[workbook.SheetNames[0]];

        rows = XLSX.utils.sheet_to_json(firstSheet, {
          defval: "",
        });
      } else {
        throw new Error(
          "Formato no permitido. Utiliza XLSX, XLS o TSV.",
        );
      }

      setPreview(rows);
      setMessage(
        `${rows.length} registros detectados correctamente.`,
      );
      setMessageType("success");
    } catch (error) {
      setPreview([]);
      setMessage(
        error.message ||
          "No fue posible leer el archivo.",
      );
      setMessageType("error");
    }
  };

  const importRecords = () => {
    if (preview.length === 0) {
      setMessage(
        "Primero selecciona un archivo válido.",
      );
      setMessageType("error");
      return;
    }

    if (dataType === "students") {
      const importedStudents = preview
        .map((row, index) => {
          return {
            id: Date.now() + index,

            name:
              row["Nombre completo"] ||
              row.Nombre ||
              row.nombre ||
              "",

            matricula:
              row["Matrícula"] ||
              row.Matricula ||
              row.matricula ||
              "",

            email:
              row["Correo institucional"] ||
              row.Correo ||
              row.correo ||
              "",

            group:
              row.Grupo ||
              row.grupo ||
              "Sin asignar",

            subjects: splitAdminValues(
              row.Materias || row.materias,
            ),

            accountStatus: "Pendiente",
          };
        })
        .filter(
          (student) =>
            student.name &&
            student.matricula &&
            student.email,
        );

      setStudents((currentStudents) =>
        mergeAdminRecords(
          currentStudents,
          importedStudents,
          "matricula",
        ),
      );
    }

    if (dataType === "teachers") {
      const importedTeachers = preview
        .map((row, index) => {
          return {
            id: Date.now() + index,

            name:
              row["Nombre completo"] ||
              row.Nombre ||
              row.nombre ||
              "",

            email:
              row["Correo institucional"] ||
              row.Correo ||
              row.correo ||
              "",

            positions: splitAdminValues(
              row.Cargo ||
                row.Cargos ||
                row.cargo ||
                row.cargos,
            ),

            subjects: splitAdminValues(
              row.Materias || row.materias,
            ),

            accountStatus: "Pendiente",
          };
        })
        .filter(
          (teacher) =>
            teacher.name && teacher.email,
        );

      setTeachers((currentTeachers) =>
        mergeAdminRecords(
          currentTeachers,
          importedTeachers,
          "email",
        ),
      );
    }

    setPreview([]);
    setFileName("");
    setMessage(
      "La información fue importada correctamente.",
    );
    setMessageType("success");
  };

  return (
    <>
      <article style={styles.editSearchIntroduction}>
        <div style={styles.editSearchIcon}>📥</div>

        <div>
          <h2 style={styles.cardTitle}>
            Cargar base de datos
          </h2>

          <p style={styles.mutedText}>
            Importa alumnos o profesores desde Excel o TSV.
          </p>
        </div>
      </article>

      <article style={styles.whiteCard}>
        <label style={styles.fieldLabel}>
          Tipo de información

          <select
            style={styles.selectInput}
            value={dataType}
            onChange={(event) => {
              setDataType(event.target.value);
              setPreview([]);
              setFileName("");
              setMessage("");
            }}
          >
            <option value="students">
              Alumnos
            </option>

            <option value="teachers">
              Profesores
            </option>
          </select>
        </label>

        <div
          style={{
            marginTop: "18px",
            padding: "25px 15px",
            border: "2px dashed #abb7cc",
            borderRadius: "14px",
            textAlign: "center",
            background: "#f8faff",
          }}
        >
          <div style={{ fontSize: "48px" }}>📄</div>

          <h3 style={styles.smallTitle}>
            Selecciona un archivo
          </h3>

          <p style={styles.mutedText}>
            Formatos permitidos: XLSX, XLS y TSV
          </p>

          <input
            type="file"
            accept=".xlsx,.xls,.tsv"
            onChange={(event) =>
              readFile(event.target.files?.[0])
            }
          />
        </div>

        {fileName && (
          <p style={styles.smallText}>
            Archivo seleccionado: {fileName}
          </p>
        )}
      </article>

      <article style={styles.whiteCard}>
        <h3 style={styles.smallTitle}>
          Columnas esperadas
        </h3>

        {dataType === "students" ? (
          <>
            <p style={styles.smallText}>
              ✓ Nombre completo
            </p>

            <p style={styles.smallText}>
              ✓ Matrícula
            </p>

            <p style={styles.smallText}>
              ✓ Correo institucional
            </p>

            <p style={styles.smallText}>
              ○ Grupo, opcional
            </p>

            <p style={styles.smallText}>
              ○ Materias separadas con |
            </p>
          </>
        ) : (
          <>
            <p style={styles.smallText}>
              ✓ Nombre completo
            </p>

            <p style={styles.smallText}>
              ✓ Correo institucional
            </p>

            <p style={styles.smallText}>
              ✓ Cargo o Cargos separados con |
            </p>

            <p style={styles.smallText}>
              ○ Materias separadas con |
            </p>
          </>
        )}
      </article>

      {message && (
        <article
          style={
            messageType === "error"
              ? {
                  ...styles.successCard,
                  background: "#fdeaea",
                  color: "#d42f2f",
                }
              : styles.successCard
          }
        >
          {messageType === "error" ? "⚠️" : "✅"}{" "}
          {message}
        </article>
      )}

      {preview.length > 0 && (
        <>
          <h3 style={styles.sectionTitle}>
            Vista previa
          </h3>

          <AdminPreviewTable
            rows={preview.slice(0, 8)}
          />

          <button
            type="button"
            style={{
              ...styles.primaryButton,
              background: "#292f99",
              marginTop: "16px",
            }}
            onClick={importRecords}
          >
            CONFIRMAR IMPORTACIÓN
          </button>
        </>
      )}
    </>
  );
}

function AdminStudents({
  students,
  setStudents,
}) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (student) => {
      const completeText = [
        student.name,
        student.matricula,
        student.email,
        student.group,
      ]
        .join(" ")
        .toLowerCase();

      return completeText.includes(
        search.toLowerCase(),
      );
    },
  );

  const changeStatus = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        return {
          ...student,
          accountStatus:
            student.accountStatus === "Activo"
              ? "Inactivo"
              : "Activo",
        };
      }),
    );
  };

  const deleteStudent = (studentId) => {
    const confirmed = window.confirm(
      "¿Deseas eliminar este alumno?",
    );

    if (!confirmed) {
      return;
    }

    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) => student.id !== studentId,
      ),
    );
  };

  return (
    <>
      <input
        style={styles.searchInput}
        placeholder="🔍 Buscar por nombre, matrícula o correo"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <h3 style={styles.sectionTitle}>
        Alumnos registrados ({filteredStudents.length})
      </h3>

      <div style={styles.list}>
        {filteredStudents.map((student) => (
          <article
            style={styles.editStudentResultCard}
            key={student.id}
          >
            <div style={styles.smallStudentAvatar}>
              🎓
            </div>

            <div style={{ flex: 1 }}>
              <strong
                style={styles.resultStudentName}
              >
                {student.name}
              </strong>

              <p style={styles.smallText}>
                Matrícula: {student.matricula}
              </p>

              <p style={styles.smallText}>
                {student.email}
              </p>

              <p style={styles.smallText}>
                Grupo: {student.group}
              </p>

              <p style={styles.smallText}>
                Materias:{" "}
                {student.subjects.length > 0
                  ? student.subjects.join(", ")
                  : "Sin asignar"}
              </p>
            </div>

            <div style={styles.editResultActions}>
              <span
                style={{
                  ...styles.statusBadge,
                  color:
                    student.accountStatus === "Activo"
                      ? "#159447"
                      : student.accountStatus ===
                          "Pendiente"
                        ? "#d98a00"
                        : "#d42f2f",

                  background:
                    student.accountStatus === "Activo"
                      ? "#e8f7ee"
                      : student.accountStatus ===
                          "Pendiente"
                        ? "#fff5dc"
                        : "#fdeaea",
                }}
              >
                {student.accountStatus}
              </span>

              <button
                type="button"
                style={styles.smallEditButton}
                onClick={() =>
                  changeStatus(student.id)
                }
              >
                Cambiar estado
              </button>

              <button
                type="button"
                style={{
                  ...styles.smallEditButton,
                  background: "#d42f2f",
                }}
                onClick={() =>
                  deleteStudent(student.id)
                }
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}

        {filteredStudents.length === 0 && (
          <article style={styles.emptyState}>
            <div style={{ fontSize: "42px" }}>🔍</div>

            <strong>
              No se encontraron alumnos
            </strong>
          </article>
        )}
      </div>
    </>
  );
}

function AdminTeachers({
  teachers,
  setTeachers,
}) {
  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter(
    (teacher) => {
      const completeText = [
        teacher.name,
        teacher.email,
        teacher.positions.join(" "),
        teacher.subjects.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return completeText.includes(
        search.toLowerCase(),
      );
    },
  );

  const changeStatus = (teacherId) => {
    setTeachers((currentTeachers) =>
      currentTeachers.map((teacher) => {
        if (teacher.id !== teacherId) {
          return teacher;
        }

        return {
          ...teacher,
          accountStatus:
            teacher.accountStatus === "Activo"
              ? "Inactivo"
              : "Activo",
        };
      }),
    );
  };

  const deleteTeacher = (teacherId) => {
    const confirmed = window.confirm(
      "¿Deseas eliminar este profesor?",
    );

    if (!confirmed) {
      return;
    }

    setTeachers((currentTeachers) =>
      currentTeachers.filter(
        (teacher) => teacher.id !== teacherId,
      ),
    );
  };

  return (
    <>
      <input
        style={styles.searchInput}
        placeholder="🔍 Buscar profesor, correo, cargo o materia"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <h3 style={styles.sectionTitle}>
        Profesores registrados ({filteredTeachers.length})
      </h3>

      <div style={styles.list}>
        {filteredTeachers.map((teacher) => (
          <article
            style={styles.editStudentResultCard}
            key={teacher.id}
          >
            <div style={styles.smallStudentAvatar}>
              👨‍🏫
            </div>

            <div style={{ flex: 1 }}>
              <strong
                style={styles.resultStudentName}
              >
                {teacher.name}
              </strong>

              <p style={styles.smallText}>
                {teacher.email}
              </p>

              <p style={styles.smallText}>
                Cargos:{" "}
                {teacher.positions.length > 0
                  ? teacher.positions.join(", ")
                  : "Sin asignar"}
              </p>

              <p style={styles.smallText}>
                Materias:{" "}
                {teacher.subjects.length > 0
                  ? teacher.subjects.join(", ")
                  : "Sin asignar"}
              </p>
            </div>

            <div style={styles.editResultActions}>
              <span
                style={{
                  ...styles.statusBadge,
                  color:
                    teacher.accountStatus === "Activo"
                      ? "#159447"
                      : teacher.accountStatus ===
                          "Pendiente"
                        ? "#d98a00"
                        : "#d42f2f",

                  background:
                    teacher.accountStatus === "Activo"
                      ? "#e8f7ee"
                      : teacher.accountStatus ===
                          "Pendiente"
                        ? "#fff5dc"
                        : "#fdeaea",
                }}
              >
                {teacher.accountStatus}
              </span>

              <button
                type="button"
                style={styles.smallEditButton}
                onClick={() =>
                  changeStatus(teacher.id)
                }
              >
                Cambiar estado
              </button>

              <button
                type="button"
                style={{
                  ...styles.smallEditButton,
                  background: "#d42f2f",
                }}
                onClick={() =>
                  deleteTeacher(teacher.id)
                }
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}

        {filteredTeachers.length === 0 && (
          <article style={styles.emptyState}>
            <div style={{ fontSize: "42px" }}>🔍</div>

            <strong>
              No se encontraron profesores
            </strong>
          </article>
        )}
      </div>
    </>
  );
}

function AdminAssignments({
  students,
  teachers,
}) {
  const [selectedTeacher, setSelectedTeacher] =
    useState(teachers[0]?.email || "");

  const [selectedSubject, setSelectedSubject] =
    useState(teacherSubjects[0]?.name || "");

  const [selectedGroup, setSelectedGroup] =
    useState("8A");

  const [saved, setSaved] = useState(false);

  const saveAssignment = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <>
      <article style={styles.editSearchIntroduction}>
        <div style={styles.editSearchIcon}>🔗</div>

        <div>
          <h2 style={styles.cardTitle}>
            Asignar responsabilidades
          </h2>

          <p style={styles.mutedText}>
            Relaciona profesores, materias y grupos.
          </p>
        </div>
      </article>

      <article style={styles.whiteCard}>
        <label style={styles.fieldLabel}>
          Profesor

          <select
            style={styles.selectInput}
            value={selectedTeacher}
            onChange={(event) =>
              setSelectedTeacher(event.target.value)
            }
          >
            {teachers.map((teacher) => (
              <option
                key={teacher.id}
                value={teacher.email}
              >
                {teacher.name}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.fieldLabel}>
          Materia

          <select
            style={styles.selectInput}
            value={selectedSubject}
            onChange={(event) =>
              setSelectedSubject(event.target.value)
            }
          >
            {teacherSubjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.name}
              >
                {subject.name}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.fieldLabel}>
          Grupo

          <select
            style={styles.selectInput}
            value={selectedGroup}
            onChange={(event) =>
              setSelectedGroup(event.target.value)
            }
          >
            <option value="6A">6A</option>
            <option value="8A">8A</option>
            <option value="8B">8B</option>
          </select>
        </label>

        <button
          type="button"
          style={{
            ...styles.primaryButton,
            background: "#292f99",
            marginTop: "18px",
          }}
          onClick={saveAssignment}
        >
          GUARDAR ASIGNACIÓN
        </button>
      </article>

      {saved && (
        <article style={styles.successCard}>
          ✅ Asignación guardada correctamente.
        </article>
      )}

      <h3 style={styles.sectionTitle}>
        Resumen de la base
      </h3>

      <article style={styles.whiteCard}>
        <InformationRow
          icon="🎓"
          label="Alumnos registrados"
          value={students.length}
        />

        <InformationRow
          icon="👨‍🏫"
          label="Profesores registrados"
          value={teachers.length}
        />

        <InformationRow
          icon="📚"
          label="Materias disponibles"
          value={teacherSubjects.length}
        />
      </article>
    </>
  );
}

function AdminPreviewTable({ rows }) {
  if (!rows.length) {
    return null;
  }

  const headers = Object.keys(rows[0]);

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        background: "#ffffff",
        borderRadius: "12px",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "650px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  padding: "12px",
                  background: "#eef1fa",
                  borderBottom:
                    "1px solid #d9deea",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td
                  key={header}
                  style={{
                    padding: "12px",
                    borderBottom:
                      "1px solid #edf0f5",
                    fontSize: "12px",
                  }}
                >
                  {String(row[header] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function splitAdminValues(value) {
  if (!value) {
    return [];
  }

  return String(value)
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function mergeAdminRecords(
  currentRecords,
  newRecords,
  key,
) {
  const recordsMap = new Map(
    currentRecords.map((record) => [
      String(record[key]).toLowerCase(),
      record,
    ]),
  );

  newRecords.forEach((record) => {
    const normalizedKey = String(
      record[key],
    ).toLowerCase();

    if (!normalizedKey) {
      return;
    }

    recordsMap.set(normalizedKey, {
      ...(recordsMap.get(normalizedKey) || {}),
      ...record,
    });
  });

  return Array.from(recordsMap.values());
}

/* =======================
   COMPONENTES
======================= */

function MobileLayout({
  title,
  color,
  showBack,
  onBack,
  children,
}) {
  return (
    <main style={styles.lightPage}>
      <section style={styles.mobilePanel}>
        <header
          style={{
            ...styles.mobileHeader,
            background: color,
          }}
        >
          <button
            type="button"
            style={styles.headerButton}
            onClick={showBack ? onBack : undefined}
          >
            {showBack ? "←" : "☰"}
          </button>

          <strong>{title}</strong>

          <button type="button" style={styles.headerButton}>
            🔔
          </button>
        </header>

        <div style={styles.mobileContent}>{children}</div>
      </section>
    </main>
  );
}

function BottomNavigation({
  color,
  active,
  items,
  setScreen,
}) {
  return (
    <nav style={styles.bottomNavigation}>
      {items.map(([screen, icon, label]) => {
        const isActive = active === screen;

        return (
          <button
            type="button"
            key={screen}
            style={{
              ...styles.navigationButton,
              color: isActive ? color : "#7a8496",
            }}
            onClick={() => setScreen(screen)}
          >
            <span style={{ fontSize: "21px" }}>{icon}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function MenuCard({ icon, label, onClick }) {
  return (
    <button
      type="button"
      style={styles.menuCard}
      onClick={onClick}
    >
      <span style={{ fontSize: "36px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function InformationRow({ icon, label, value }) {
  return (
    <div style={styles.informationRow}>
      <span style={styles.informationIcon}>{icon}</span>

      <div>
        <small style={styles.informationLabel}>
          {label}
        </small>

        <p style={styles.informationValue}>{value}</p>
      </div>
    </div>
  );
}

function AttendanceCard({
  title,
  subtitle,
  detail,
  status,
}) {
  const statusStyle = getStatusStyle(status);

  return (
    <article style={styles.attendanceCard}>
      <div
        style={{
          ...styles.attendanceIndicator,
          background: statusStyle.color,
        }}
      />

      <div style={{ flex: 1 }}>
        <h3 style={styles.smallTitle}>{title}</h3>
        <p style={styles.smallText}>{subtitle}</p>
        <p style={styles.smallText}>{detail}</p>
      </div>

      <span
        style={{
          ...styles.statusBadge,
          color: statusStyle.color,
          background: statusStyle.background,
        }}
      >
        {status}
      </span>
    </article>
  );
}

function FilterButtons({
  selected,
  setSelected,
  options,
  color,
}) {
  return (
    <div style={styles.filterContainer}>
      {options.map((option) => (
        <button
          type="button"
          key={option}
          style={{
            ...styles.filterButton,
            ...(selected === option
              ? {
                  background: color,
                  borderColor: color,
                  color: "#ffffff",
                }
              : {}),
          }}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Counter({ value, label, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <strong
        style={{
          display: "block",
          color,
          fontSize: "24px",
        }}
      >
        {value}
      </strong>

      <span style={styles.counterLabel}>{label}</span>
    </div>
  );
}

function SummaryValue({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <strong style={styles.summaryValue}>{value}</strong>
      <span style={styles.summaryLabel}>{label}</span>
    </div>
  );
}

function AttendancePercentage({ value }) {
  const color =
    value >= 90
      ? "#159447"
      : value >= 80
        ? "#d98a00"
        : "#d42f2f";

  return (
    <div
      style={{
        ...styles.percentageCircle,
        borderColor: color,
        color,
      }}
    >
      {value}%
    </div>
  );
}

function LogoutButton({ onLogout }) {
  return (
    <button
      type="button"
      style={styles.logoutButton}
      onClick={onLogout}
    >
      ↪ Cerrar sesión
    </button>
  );
}

function SimplePanel({
  title,
  name,
  detail,
  cards,
  onLogout,
}) {
  return (
    <main style={styles.lightPage}>
      <section style={styles.mobilePanel}>
        <header style={styles.mobileHeader}>
          <span>☰</span>
          <strong>{title}</strong>
          <span>🔔</span>
        </header>

        <div style={styles.mobileContent}>
          <article style={styles.profileCard}>
            <div style={styles.avatar}>👤</div>

            <div>
              <p style={styles.blueLabel}>¡Bienvenido!</p>
              <h2 style={styles.cardTitle}>{name}</h2>
              <p style={styles.mutedText}>{detail}</p>
            </div>
          </article>

          <div style={styles.grid}>
            {cards.map(([icon, label]) => (
              <MenuCard
                key={label}
                icon={icon}
                label={label}
                onClick={() =>
                  window.alert(
                    `${label}: módulo preliminar.`,
                  )
                }
              />
            ))}
          </div>

          <LogoutButton onLogout={onLogout} />
        </div>
      </section>
    </main>
  );
}

function formatPrototypeDate(dateValue) {
  if (!dateValue) {
    return "Sin fecha";
  }

  const [year, month, day] = dateValue.split("-");

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  return `${day} de ${
    months[Number(month) - 1]
  } de ${year}`;
}

function convertPrototypeTime(timeValue) {
  if (!timeValue || timeValue === "—") {
    return "";
  }

  const [time, period] = timeValue.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}`;
}

function formatPrototypeTime(timeValue) {
  if (!timeValue) {
    return "—";
  }

  let [hours, minutes] = timeValue.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")} ${period}`;
}

function getStatusStyle(status) {
  if (status === "Presente") {
    return {
      color: "#159447",
      background: "#e8f7ee",
    };
  }

  if (status === "Retardo") {
    return {
      color: "#d98a00",
      background: "#fff5dc",
    };
  }

  if (status === "Justificada") {
    return {
      color: "#0b63ce",
      background: "#e8f1fd",
    };
  }

  return {
    color: "#d42f2f",
    background: "#fdeaea",
  };
}

/* =======================
   ESTILOS
======================= */

const styles = {
  rolePage: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(160deg, #063ba2, #1556bd, #073696)",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  editSearchIntroduction: {
    padding: "17px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  editSearchIcon: {
    width: "56px",
    height: "56px",
    display: "grid",
    placeItems: "center",
    borderRadius: "14px",
    background: "#e8effd",
    fontSize: "28px",
  },

  fieldLabel: {
    display: "block",
    marginTop: "14px",
    color: "#344054",
    fontSize: "12px",
    fontWeight: 700,
  },

  fieldTitle: {
    margin: "0 0 12px",
    color: "#344054",
    fontSize: "13px",
    fontWeight: 800,
  },

  selectInput: {
    width: "100%",
    height: "50px",
    marginTop: "8px",
    padding: "0 12px",
    border: "1px solid #d4dae5",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#344054",
    fontSize: "14px",
  },

  selectedFiltersCard: {
    marginBottom: "14px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    background: "#eaf1ff",
    borderRadius: "12px",
    color: "#174a9e",
  },

  editStudentResultCard: {
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    background: "#ffffff",
    borderRadius: "13px",
  },

  smallStudentAvatar: {
    width: "46px",
    height: "46px",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#eaf1ff",
    fontSize: "25px",
  },

  resultStudentName: {
    color: "#172033",
    fontSize: "13px",
  },

  editResultActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
  },

  smallEditButton: {
    minWidth: "65px",
    minHeight: "32px",
    border: "none",
    borderRadius: "8px",
    background: "#0b43a8",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: 700,
    cursor: "pointer",
  },

  emptyState: {
    padding: "35px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    background: "#ffffff",
    borderRadius: "14px",
    textAlign: "center",
  },

  studentEditHeader: {
    padding: "17px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  auditCard: {
    marginTop: "13px",
    padding: "15px",
    borderLeft: "5px solid #0b43a8",
    borderRadius: "12px",
    background: "#eaf1ff",
    color: "#174a9e",
  },

  attendanceOptionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  },

  attendanceOption: {
    minHeight: "82px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "1px solid #d4dae5",
    borderRadius: "11px",
    background: "#ffffff",
    color: "#667085",
    fontWeight: 700,
    cursor: "pointer",
  },

  attendanceOptionActive: {
    border: "2px solid #0b43a8",
    background: "#eaf1ff",
    color: "#0b43a8",
  },

  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  },

  textareaInput: {
    width: "100%",
    minHeight: "95px",
    marginTop: "8px",
    padding: "12px",
    resize: "vertical",
    border: "1px solid #d4dae5",
    borderRadius: "10px",
    fontFamily: "inherit",
    fontSize: "14px",
  },

  changeAuditCard: {
    marginTop: "14px",
    padding: "14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "11px",
    border: "1px solid #cbd8ee",
    borderRadius: "12px",
    background: "#f6f9ff",
    color: "#344054",
  },

  formActionGrid: {
    marginTop: "15px",
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: "10px",
  },

  cancelButton: {
    minHeight: "52px",
    border: "1px solid #d4dae5",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#667085",
    fontWeight: 800,
    cursor: "pointer",
  },

  roleContainer: {
    width: "100%",
    maxWidth: "430px",
    padding: "38px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  logo: {
    fontSize: "72px",
    marginBottom: "22px",
  },

  mainTitle: {
    width: "100%",
    margin: 0,
    color: "#ffffff",
    fontSize: "42px",
    lineHeight: 1.08,
    fontWeight: 800,
  },

  mainSubtitle: {
    margin: "12px 0 52px",
    color: "#ffffff",
    fontSize: "18px",
  },

  roleButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  roleButton: {
    width: "100%",
    minHeight: "66px",
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    fontSize: "18px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(0,25,85,0.18)",
  },

  version: {
    margin: "48px 0 0",
    color: "#ffffff",
    fontSize: "16px",
  },

  lightPage: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f8",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  phonePanel: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "720px",
    background: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(17,38,73,0.18)",
  },

  loginHeader: {
    minHeight: "68px",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#ffffff",
  },

  loginBody: {
    padding: "44px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  loginIcon: {
    width: "92px",
    height: "92px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    fontSize: "46px",
  },

  loginTitle: {
    margin: "22px 0 6px",
    color: "#172033",
  },

  form: {
    width: "100%",
    marginTop: "24px",
  },

  label: {
    display: "block",
    marginBottom: "18px",
    color: "#293348",
    fontSize: "14px",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    height: "52px",
    marginTop: "8px",
    padding: "0 14px",
    border: "1px solid #d4dae5",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
  },

  passwordWrapper: {
    position: "relative",
  },

  passwordButton: {
    position: "absolute",
    top: "18px",
    right: "10px",
    width: "36px",
    height: "36px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    margin: "3px 0 20px",
    color: "#4c566a",
    fontSize: "14px",
  },

  errorText: {
    color: "#d42f2f",
    fontSize: "13px",
  },

  primaryButton: {
    width: "100%",
    minHeight: "52px",
    border: "none",
    borderRadius: "10px",
    color: "#ffffff",
    fontWeight: 800,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    minHeight: "50px",
    border: "1px solid #0b43a8",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#0b43a8",
    fontWeight: 800,
    cursor: "pointer",
  },

  linkButton: {
    marginTop: "17px",
    border: "none",
    background: "transparent",
    color: "#0b43a8",
    fontWeight: 700,
  },

  prototypeNote: {
    marginTop: "20px",
    color: "#8992a3",
    fontSize: "11px",
    lineHeight: 1.5,
    textAlign: "center",
  },

  mobilePanel: {
    width: "100%",
    maxWidth: "470px",
    minHeight: "760px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    background: "#f5f7fb",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(17,38,73,0.18)",
  },

  mobileHeader: {
    minHeight: "68px",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#0b43a8",
    color: "#ffffff",
  },

  headerButton: {
    width: "36px",
    height: "36px",
    border: "none",
    background: "transparent",
    color: "#ffffff",
    fontSize: "22px",
    cursor: "pointer",
  },

  mobileContent: {
    flex: 1,
    padding: "18px",
    paddingBottom: "92px",
    overflowY: "auto",
  },

  bottomNavigation: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "72px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    background: "#ffffff",
    borderTop: "1px solid #e4e7ec",
  },

  navigationButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    border: "none",
    background: "transparent",
    fontSize: "11px",
    fontWeight: 700,
    cursor: "pointer",
  },

  profileCard: {
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(20,40,80,0.08)",
  },

  avatar: {
    width: "64px",
    height: "64px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "#eaf1ff",
    fontSize: "35px",
  },

  largeAvatar: {
    width: "76px",
    height: "76px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "#eaf1ff",
    fontSize: "43px",
  },

  blueLabel: {
    margin: "0 0 4px",
    color: "#0b43a8",
    fontSize: "13px",
    fontWeight: 700,
  },

  cardTitle: {
    margin: 0,
    color: "#172033",
    fontSize: "20px",
  },

  mutedText: {
    margin: "5px 0 0",
    color: "#667085",
    fontSize: "13px",
  },

  bluetoothCard: {
    marginTop: "10px",
    padding: "13px 16px",
    display: "flex",
    justifyContent: "space-between",
    background: "#ffffff",
    borderRadius: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "13px",
    marginTop: "16px",
  },

  menuCard: {
    minHeight: "135px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    border: "none",
    borderRadius: "14px",
    background: "#ffffff",
    color: "#0b43a8",
    fontWeight: 700,
    boxShadow: "0 5px 15px rgba(20,40,80,0.08)",
    cursor: "pointer",
  },

  logoutButton: {
    width: "100%",
    minHeight: "50px",
    marginTop: "17px",
    border: "1px solid #e2e6ee",
    borderRadius: "11px",
    background: "#ffffff",
    color: "#c62828",
    fontWeight: 700,
    cursor: "pointer",
  },

  whiteCard: {
    marginTop: "15px",
    padding: "16px",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(20,40,80,0.08)",
  },

  informationRow: {
    padding: "13px 0",
    display: "flex",
    gap: "12px",
    borderBottom: "1px solid #eef0f5",
  },

  informationIcon: {
    width: "30px",
    fontSize: "20px",
  },

  informationLabel: {
    color: "#667085",
    fontSize: "11px",
  },

  informationValue: {
    margin: "3px 0 0",
    color: "#172033",
    fontSize: "14px",
  },

  sectionTitle: {
    margin: "20px 0 12px",
    color: "#0b43a8",
    fontSize: "17px",
  },

  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  chip: {
    padding: "8px 11px",
    borderRadius: "999px",
    background: "#e8effd",
    color: "#174a9e",
    fontSize: "12px",
    fontWeight: 700,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "11px",
  },

  subjectCard: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  subjectIcon: {
    width: "52px",
    height: "52px",
    display: "grid",
    placeItems: "center",
    borderRadius: "13px",
    fontSize: "27px",
  },

  smallTitle: {
    margin: 0,
    color: "#172033",
    fontSize: "15px",
  },

  smallText: {
    margin: "4px 0 0",
    color: "#667085",
    fontSize: "11px",
  },

  filterContainer: {
    display: "flex",
    gap: "7px",
    marginBottom: "14px",
    overflowX: "auto",
  },

  filterButton: {
    padding: "8px 12px",
    border: "1px solid #e1e5ed",
    borderRadius: "999px",
    background: "#ffffff",
    color: "#667085",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  attendanceCard: {
    position: "relative",
    minHeight: "102px",
    padding: "15px 12px 15px 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    borderRadius: "13px",
    overflow: "hidden",
  },

  attendanceIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "6px",
  },

  statusBadge: {
    padding: "7px 9px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 700,
  },

  summaryGrid: {
    marginTop: "15px",
    padding: "18px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  summaryValue: {
    display: "block",
    color: "#0b43a8",
    fontSize: "23px",
  },

  summaryLabel: {
    display: "block",
    marginTop: "5px",
    color: "#667085",
    fontSize: "10px",
  },

  stepRow: {
    minHeight: "58px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    borderBottom: "1px solid #eef0f5",
    fontSize: "13px",
  },

  stepCircle: {
    width: "30px",
    height: "30px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    fontSize: "12px",
  },

  successCard: {
    marginTop: "16px",
    padding: "17px",
    border: "1px solid #72bf8e",
    borderRadius: "14px",
    background: "#eefaf2",
    color: "#087a37",
    fontWeight: 700,
  },

  nextClassCard: {
    marginTop: "14px",
    padding: "17px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#0b43a8",
    borderRadius: "14px",
    color: "#ffffff",
  },

  teacherSubjectCard: {
    width: "100%",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    border: "none",
    background: "#ffffff",
    borderRadius: "14px",
    cursor: "pointer",
  },

  subjectTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },

  activeClassBadge: {
    padding: "4px 7px",
    borderRadius: "999px",
    background: "#e8f7ee",
    color: "#159447",
    fontSize: "9px",
    fontWeight: 800,
  },

  classInformationCard: {
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: "14px",
  },

  liveBadge: {
    padding: "7px 9px",
    borderRadius: "999px",
    background: "#fdeaea",
    color: "#d42f2f",
    fontSize: "10px",
    fontWeight: 800,
  },

  attendanceCounters: {
    margin: "13px 0",
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    background: "#ffffff",
    borderRadius: "14px",
  },

  counterLabel: {
    color: "#667085",
    fontSize: "10px",
  },

  searchInput: {
    width: "100%",
    height: "48px",
    marginBottom: "12px",
    padding: "0 14px",
    border: "1px solid #d4dae5",
    borderRadius: "10px",
    background: "#ffffff",
  },

  statusHelp: {
    color: "#8992a3",
    fontSize: "10px",
    lineHeight: 1.4,
  },

  teacherStudentCard: {
    padding: "13px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    borderRadius: "13px",
  },

  statusCircle: {
    width: "18px",
    height: "18px",
    flexShrink: 0,
    border: "3px solid #ffffff",
    borderRadius: "50%",
    boxShadow: "0 0 0 1px #d0d5dd",
    cursor: "pointer",
  },

  studentInformationButton: {
    flex: 1,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "3px",
    border: "none",
    background: "transparent",
    color: "#172033",
    cursor: "pointer",
  },

  arrowButton: {
    border: "none",
    background: "transparent",
    fontSize: "22px",
    cursor: "pointer",
  },

  studentDetailHeader: {
    padding: "17px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  percentageCircle: {
    width: "58px",
    height: "58px",
    display: "grid",
    placeItems: "center",
    border: "5px solid",
    borderRadius: "50%",
    fontSize: "13px",
    fontWeight: 800,
  },

  reportSummary: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: "14px",
    textAlign: "center",
  },

  bigPercentage: {
    marginTop: "16px",
    color: "#0b43a8",
    fontSize: "48px",
  },

  reportCard: {
    padding: "16px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  reportTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  progressTrack: {
    height: "8px",
    margin: "13px 0",
    overflow: "hidden",
    borderRadius: "999px",
    background: "#e5e9f1",
  },

  progressBar: {
    height: "100%",
    borderRadius: "999px",
    background: "#0b43a8",
  },

  reportDetails: {
    display: "flex",
    justifyContent: "space-between",
    gap: "5px",
    fontSize: "9px",
  },
};

export default App;

