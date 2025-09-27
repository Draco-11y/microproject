import React, { useState, useEffect, useRef } from "react";

// --- TYPE DEFINITIONS ---
interface GripperData {
  id: string;
  name: string;
  tagline: string;
  overview: {
    title: string;
    description: string;
  };
  workingPrinciple: {
    title: string;
    description: string;
  };
  subTypes: {
    title: string;
    items: { name: string; description: string }[];
  };
  actuation: {
    title: string;
    description: string;
  };
  specifications: {
    title: string;
    specs: { metric: string; value: string }[];
  };
  applications: {
    title: string;
    description: string;
    gallery: { src: string; alt: string }[];
    list: string[];
  };
  prosCons: {
    title: string;
    pros: string[];
    cons: string[];
  };
  selection: {
    title: string;
    points: string[];
  };
}

// --- DATA STORE (ENHANCED DETAIL) ---
const gripperData: GripperData[] = [
  {
    id: "pneumatic",
    name: "Pneumatic Gripper",
    tagline: "Versatile and powerful gripping using compressed air.",
    overview: {
      title: "Overview",
      description:
        "Pneumatic grippers are the undisputed workhorses of industrial automation, representing the most common type of end effector. They are prized for their elegant simplicity, exceptional reliability, low cost, and a high power-to-weight ratio unmatched by other technologies. By harnessing compressed air—a ubiquitous utility in most manufacturing facilities—they can actuate powerful and rapid gripping actions suitable for a vast spectrum of industrial tasks, from delicate electronics assembly to heavy-duty material handling.",
    },
    workingPrinciple: {
      title: "Working Principle & Operation",
      description:
        "The operation is a direct application of Pascal's law, converting the potential energy of compressed air into kinetic energy (mechanical motion). The core component is a piston housed within a precision-machined cylinder. When a controller signals a solenoid valve to open, high-pressure air (typically 60-100 psi) is directed into the cylinder on one side of the piston. This pressure exerts a significant force on the piston's surface area (Force = Pressure x Area), causing it to move linearly with high speed and acceleration. This linear motion is then ingeniously transferred to the gripper jaws through a system of hardened steel linkages, wedge-cams, or lever mechanisms, which can also multiply the initial force. In a double-acting gripper—the industry standard for its precise control—a second air port allows air to actively drive the piston in the reverse direction, ensuring a controlled and equally rapid release of the workpiece.",
    },
    subTypes: {
      title: "Sub-Types and Variations",
      items: [
        {
          name: "Parallel Grippers (2-Jaw)",
          description:
            "The most common type. Jaws move in a straight, parallel line, providing a secure grip on rectangular or prismatic parts. Often use a wedge-cam mechanism for high force.",
        },
        {
          name: "Angular Grippers",
          description:
            "Jaws pivot around a central point like pincers. Ideal for situations requiring a wide opening stroke in a compact body, or for gripping parts with unusual geometries.",
        },
        {
          name: "Three-Jaw Grippers",
          description:
            "Provides a highly stable, self-centering grip for cylindrical or round objects, ensuring the part is precisely located every time.",
        },
        {
          name: "Inflatable Bladder Grippers",
          description:
            "A soft, balloon-like gripper that inflates to gently conform to and grip fragile or irregularly shaped items from the inside (e.g., bottles, jars).",
        },
      ],
    },
    actuation: {
      title: "Actuation and Drive Systems",
      description:
        "The system is controlled by a 4-way solenoid valve that directs the flow of compressed air into the two ports of the double-acting cylinder. The gripping force is highly tunable by placing a pressure regulator on the air line, allowing for delicate handling of some parts and high-force gripping of others. Additionally, flow control valves can be used to independently adjust the opening and closing speed of the jaws, preventing part damage from sudden movements.",
    },
    specifications: {
      title: "Technical Specifications",
      specs: [
        { metric: "Gripping Force", value: "10 N to >40,000 N" },
        { metric: "Stroke per Jaw", value: "2 mm to 250 mm" },
        { metric: "Operating Pressure", value: "4 - 8 bar (60 - 120 psi)" },
        { metric: "Repeatability", value: "±0.01 mm to ±0.05 mm" },
        { metric: "Actuation Time", value: "50ms to 500ms" },
      ],
    },
    applications: {
      title: "Industrial Applications",
      description:
        "Their exceptional speed and power make pneumatic grippers the default choice for high-throughput applications where precise force feedback is not the primary requirement.",
      gallery: [
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Pick+&+Place",
          alt: "Pick and Place Application",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Machine+Tending",
          alt: "Machine Tending",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Assembly",
          alt: "Assembly Line",
        },
      ],
      list: [
        "High-Speed Pick and Place: Rapidly transferring components from a conveyor to a circuit board or packaging.",
        "CNC Machine Tending: Loading raw material billets into CNC mills and lathes and unloading finished parts with high reliability.",
        "Automated Assembly: Performing repetitive tasks like inserting pins, fastening components, and moving sub-assemblies along a production line.",
        "Packaging and Palletizing: Erecting cartons, orienting products for packaging, and stacking cases for shipment.",
      ],
    },
    prosCons: {
      title: "Advantages and Disadvantages",
      pros: [
        "Extremely high speed",
        "Highest force-to-size ratio",
        "Low initial cost and simple maintenance",
        "Robust and tolerant of harsh environments",
      ],
      cons: [
        "Requires compressed air infrastructure (compressor, lines, filters)",
        "Limited native control over force and position",
        "Can be noisy without mufflers",
        "Air can be a source of contamination in cleanrooms if not properly filtered.",
      ],
    },
    selection: {
      title: "Selection Considerations",
      points: [
        "Part weight, geometry, and material",
        "Required gripping force and stroke length",
        "Environmental conditions (e.g., cleanroom, washdown, explosive)",
        "Cycle time requirements",
        "Available air supply pressure and quality",
      ],
    },
  },
  {
    id: "mechanical",
    name: "Electric Servo Gripper",
    tagline: "Precision control of force, position, and speed.",
    overview: {
      title: "Overview",
      description:
        "Electric Servo Grippers represent the pinnacle of gripping technology, offering unparalleled control over every aspect of the gripping process. Instead of a simple open/close action, they use sophisticated servo motors to precisely control jaw position, velocity, and gripping force. This makes them the ideal solution for complex assembly tasks, quality inspection, and handling delicate or varied parts where precision and data feedback are critical.",
    },
    workingPrinciple: {
      title: "Working Principle & Operation",
      description:
        "The core of an electric gripper is a high-resolution servo motor. The motor's rotation is converted into powerful linear motion for the jaws via a high-efficiency mechanism, typically a ball screw or lead screw. A rotary encoder on the motor constantly tracks its position with thousands of increments per revolution, allowing the controller to know the exact position of the jaws down to the micron level. By monitoring the motor's current draw, the gripper can calculate and apply a precise, consistent gripping force. This closed-loop feedback system allows the gripper to verify a successful grip, measure part dimensions, and adapt its grip on-the-fly.",
    },
    subTypes: {
      title: "Sub-Types and Variations",
      items: [
        {
          name: "2-Jaw Parallel",
          description:
            "The most common configuration, offering precise handling for a wide variety of part shapes.",
        },
        {
          name: "3-Jaw Self-Centering",
          description:
            "Ideal for securely gripping cylindrical parts and providing accurate centering for tasks like machine loading.",
        },
        {
          name: "Adaptive Grippers",
          description:
            "Utilize multiple, linked finger segments that conform around the shape of an object, providing a very secure and versatile grip for a wide range of geometries.",
        },
      ],
    },
    actuation: {
      title: "Actuation and Drive Systems",
      description:
        "Actuated by a brushless DC (BLDC) servo motor integrated with a high-resolution encoder for position feedback and a driver that controls power and reads current for force feedback. These grippers communicate with the robot controller over industrial protocols like EtherNet/IP, PROFINET, or Modbus TCP, allowing for real-time control and data exchange.",
    },
    specifications: {
      title: "Technical Specifications",
      specs: [
        { metric: "Gripping Force", value: "5 N to 2,000 N" },
        { metric: "Position Repeatability", value: "±0.01 mm to ±0.03 mm" },
        { metric: "Control", value: "Position, Speed, Force, Acceleration" },
        {
          metric: "Communication",
          value: "Digital I/O, EtherNet/IP, PROFINET, Modbus",
        },
      ],
    },
    applications: {
      title: "Industrial Applications",
      description:
        "These grippers are found in high-value, high-precision applications where data and control are paramount.",
      gallery: [
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Electronics",
          alt: "Electronics Assembly",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Inspection",
          alt: "Metrology",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Lab+Automation",
          alt: "Lab Automation",
        },
      ],
      list: [
        "Complex Electronics Assembly: Handling delicate PCBs, connectors, and sensitive components with controlled force.",
        "In-Line Metrology and Inspection: Using the gripper to measure a part's dimensions after gripping to perform quality checks.",
        "Medical Device & Lab Automation: Handling vials, test tubes, and other sensitive lab equipment with high precision.",
        "Machine Tending with Part Validation: Gripping a raw part, confirming its dimensions are correct, then loading it into a CNC machine.",
      ],
    },
    prosCons: {
      title: "Advantages and Disadvantages",
      pros: [
        "Precise control over jaw position, speed, and force",
        "Grip confirmation and part measurement capabilities",
        "No compressed air required, quieter operation",
        "Ideal for high-mix, low-volume production",
      ],
      cons: [
        "Higher initial cost",
        "Lower force-to-size ratio than pneumatic grippers",
        "Can be more complex to integrate and program",
        "Less tolerant of harsh, contaminated environments",
      ],
    },
    selection: {
      title: "Selection Considerations",
      points: [
        "Is precise force/position control required?",
        "Do you need to handle multiple, different-sized parts?",
        "Is data collection (part size, grip success) a requirement?",
        "What is the cleanliness of the operating environment?",
      ],
    },
  },
  {
    id: "magnetic",
    name: "Magnetic Gripper",
    tagline: "Handling ferrous materials with powerful magnetic fields.",
    overview: {
      title: "Overview",
      description:
        "Magnetic grippers are a specialized and highly effective solution for lifting and handling ferromagnetic materials (those containing iron, nickel, or cobalt, such as carbon steel). They use a powerful magnetic field to attach to the part, eliminating the need for jaws or fingers that could obstruct access in tight spaces. This makes them exceptionally effective for tasks like handling sheet metal, de-stacking thin plates, or picking parts with complex shapes that are difficult to grasp mechanically.",
    },
    workingPrinciple: {
      title: "Working Principle & Operation",
      description:
        "There are two main types. The first, a simple **Electromagnet**, works by passing a direct current (DC) through a coil of wire wrapped around a soft iron core, generating a strong magnetic field. The grip is maintained only as long as the current flows. The second, and far more common in modern robotics, is the **Electro-Permanent Magnet (EPM)**. It brilliantly combines high-power permanent magnets (like Neodymium) and an electromagnetic coil. It does not require power to maintain its grip. Instead, a short, powerful pulse of electricity is used to momentarily reverse the polarity of some internal magnets, which either aligns with or opposes the permanent magnets, thereby switching the external magnetic field on or off. This makes EPMs intrinsically safe (they don't drop parts on power loss) and extremely energy-efficient.",
    },
    subTypes: {
      title: "Sub-Types and Variations",
      items: [
        {
          name: "Electromagnets",
          description:
            "Use an electric current to generate a magnetic field. Simple to control but require constant power to hold and can generate heat.",
        },
        {
          name: "Electro-Permanent Magnets (EPM)",
          description:
            "Use a short pulse of electricity to switch a permanent magnet on or off. Requires no power to maintain hold, making them safer and more energy-efficient.",
        },
        {
          name: "Active Field Shaping",
          description:
            "Advanced EPMs that can dynamically control the shape and depth of the magnetic field to selectively pick up thin sheets from a stack.",
        },
      ],
    },
    actuation: {
      title: "Actuation and Drive Systems",
      description:
        "Actuation involves a specialized controller that can deliver the high-current DC pulses needed to switch an EPMs state. For electromagnets, a simple relay or solid-state driver applies and removes DC voltage. The control is typically a simple digital ON/OFF signal from the robot controller.",
    },
    specifications: {
      title: "Technical Specifications",
      specs: [
        { metric: "Lifting Capacity", value: "1 kg to >2000 kg" },
        {
          metric: "Residual Magnetism",
          value: "Low to negligible (for high-quality EPMs)",
        },
        { metric: "Actuation Time", value: "200ms to 1s" },
        {
          metric: "Power Consumption",
          value:
            "High during switching pulse (EPM), constant when on (Electromagnet)",
        },
      ],
    },
    applications: {
      title: "Industrial Applications",
      description:
        "Ideal for any high-speed application involving the movement of steel or iron components, especially flat, heavy, or irregularly shaped ones.",
      gallery: [
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Sheet+Metal",
          alt: "Sheet Metal Handling",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Bin+Picking",
          alt: "Bin Picking",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Press+Tending",
          alt: "Press Tending",
        },
      ],
      list: [
        "Sheet Metal De-stacking: Picking single steel sheets from a stack for loading into stamping presses or laser cutters.",
        "Press Tending: Rapidly moving stamped steel parts in and out of stamping presses.",
        "Robotic Bin Picking: Identifying and retrieving random ferrous parts from a large container using a vision system.",
        "Automated Welding Fixture Loading: Placing steel components accurately into fixtures for robotic welding.",
      ],
    },
    prosCons: {
      title: "Advantages and Disadvantages",
      pros: [
        "Very strong and reliable hold",
        "Can handle perforated or uneven surfaces",
        "No moving parts, very low maintenance",
        "Fast cycle times",
        "Fail-safe operation (EPMs)",
      ],
      cons: [
        "Only works with ferromagnetic materials",
        "Residual magnetism can sometimes be an issue for downstream processes like welding or painting",
        "Can attract unwanted metallic debris",
      ],
    },
    selection: {
      title: "Selection Considerations",
      points: [
        "Is the part material ferromagnetic?",
        "Part weight, shape, and surface condition",
        "Is there a risk of picking multiple sheets at once?",
        "Is residual magnetism a concern for subsequent processes?",
        "Is fail-safe operation during power loss required?",
      ],
    },
  },
  {
    id: "vacuum",
    name: "Vacuum Gripper",
    tagline: "Lifting smooth, non-porous objects with suction.",
    overview: {
      title: "Overview",
      description:
        "Vacuum grippers are a highly versatile and cost-effective technology for handling a vast variety of objects, especially those that are flat, smooth, and non-porous. Instead of grasping an object with fingers, they lift it from the top using suction created by a pressure differential. This makes them ideal for applications like packaging, palletizing, and handling sheet goods (glass, wood, plastic) where edge gripping is impractical or could cause surface damage.",
    },
    workingPrinciple: {
      title: "Working Principle & Operation",
      description:
        "The gripping principle does not rely on \"suction\" but rather the immense force of atmospheric pressure. A vacuum generator (either a mechanical pump or a venturi device using compressed air) rapidly evacuates air from inside a sealed suction cup that has been placed against the object's surface. This creates a region of low pressure inside the cup. The constant atmospheric pressure of the surrounding air (~14.7 psi or ~1 bar at sea level) is now substantially higher than the pressure inside the cup. This pressure difference creates a powerful net upward force on the object, holding it firmly against the cup's sealing lip. The total lifting force is a direct product of the surface area of the cup and the achieved pressure differential.",
    },
    subTypes: {
      title: "Sub-Types and Variations",
      items: [
        {
          name: "Suction Cups",
          description:
            "The most common type, available in countless shapes, sizes, and materials (Silicone for heat, Nitrile for oil, Polyurethane for wear resistance).",
        },
        {
          name: "Large Area Foam Grippers",
          description:
            "Use a thick layer of specialized foam with multiple vacuum holes. The foam conforms to uneven or irregular surfaces like shrink-wrapped items, bags of product, or rough-sawn wood.",
        },
        {
          name: "Bernoulli Grippers",
          description:
            "Blow a high-speed stream of air out between the gripper and the part. The fast-moving air creates a low-pressure zone that lifts the object without contact, ideal for delicate items like silicon wafers or solar cells.",
        },
      ],
    },
    actuation: {
      title: "Actuation and Drive Systems",
      description:
        'A vacuum source is required, which can be a central mechanical vacuum pump or, more commonly for individual robots, a compact venturi generator. Venturi generators use a small amount of compressed air flowing through a specially shaped nozzle to create a strong vacuum. A solenoid valve controls the airflow to the generator, switching the vacuum on and off. A "blow-off" pulse of positive pressure is often used to ensure a quick and clean release of the part.',
    },
    specifications: {
      title: "Technical Specifications",
      specs: [
        {
          metric: "Lifting Force",
          value:
            "Dependent on cup area and vacuum level (typically -60 to -90 kPa)",
        },
        {
          metric: "Air Consumption",
          value:
            "A critical factor for venturi generators; varies with capacity",
        },
        {
          metric: "Cup Materials",
          value: "Silicone, Nitrile, Polyurethane, HNBR, etc.",
        },
      ],
    },
    applications: {
      title: "Industrial Applications",
      description:
        "Vacuum technology is a cornerstone of modern packaging, logistics, and manufacturing where smooth-surfaced items are common.",
      gallery: [
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Palletizing",
          alt: "Box Palletizing",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Glass+Handling",
          alt: "Glass Handling",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Bag+Handling",
          alt: "Bag Handling",
        },
      ],
      list: [
        "Case and Box Palletizing: The primary application in end-of-line packaging, rapidly stacking cartons onto pallets.",
        "Sheet Goods Handling: Moving large, flat sheets of glass, wood, plastic or metal without causing scratches or deformation.",
        "Bag Handling in Food/Agriculture: Lifting bags of grain, pet food, or other materials using large foam grippers.",
        "Electronics Manufacturing: Handling delicate screens, solar cells, and circuit boards with non-contact Bernoulli grippers.",
      ],
    },
    prosCons: {
      title: "Advantages and Disadvantages",
      pros: [
        "Highly versatile for many materials",
        "Very low cost and lightweight",
        "Fast actuation",
        "Can conform to some surface variation (foam grippers)",
      ],
      cons: [
        "Does not work on porous or very rough materials",
        "Requires a vacuum source (air or electric)",
        "Sensitive to dust and debris which can break the seal",
        "Continuous air consumption for venturi generators.",
      ],
    },
    selection: {
      title: "Selection Considerations",
      points: [
        "Part surface condition (porous, smooth, oily, rough)",
        "Part weight and size to determine required cup area",
        "Cycle time (vacuum generation can take a fraction of a second)",
        "Operating environment cleanliness",
      ],
    },
  },
  {
    id: "adhesive",
    name: "Adhesive Gripper",
    tagline: "Gentle handling of delicate, flat items using molecular forces.",
    overview: {
      title: "Overview",
      description:
        "Adhesive grippers are a revolutionary approach to handling, inspired by the remarkable ability of geckos to climb smooth surfaces. They use a proprietary, micro-structured pad that adheres to objects through powerful intermolecular van der Waals forces. This method is completely passive, residue-free, and requires no external power to maintain its grip, making it the perfect solution for handling extremely delicate, flat, and clean items (like glass, silicon wafers, or optical lenses) that could be damaged by mechanical force, vacuum pressure, or contaminants.",
    },
    workingPrinciple: {
      title: "Working Principle & Operation",
      description:
        "The \"stickiness\" is not from a chemical adhesive but from a physical phenomenon at the atomic scale. The gripper's surface is covered with millions of microscopic, precisely engineered structures. This design vastly increases the effective surface area that makes intimate contact with the object. When the pad touches a smooth surface, the close proximity between these micro-structures and the object's surface allows the weak but incredibly numerous van der Waals forces to create a strong, shear-resistant adhesive bond. To release the object, the gripper doesn't pull straight back. Instead, it applies a slight peeling or tilting motion. This motion concentrates all the stress at the propagating crack tip, breaking the molecular bonds sequentially rather than all at once, which requires very little force to release the part cleanly and instantly.",
    },
    subTypes: {
      title: "Sub-Types and Variations",
      items: [
        {
          name: "Passive Adhesion",
          description:
            "Relies purely on the material properties and requires a slight shear or peeling motion to release the part. Most common type.",
        },
        {
          name: "Active Adhesion",
          description:
            "Experimental types that may use electrostatic fields or other methods to enhance or nullify the adhesive effect for release.",
        },
      ],
    },
    actuation: {
      title: "Actuation and Drive Systems",
      description:
        'The "gripping" action requires no energy; it is a passive process achieved simply by making contact with the part. Releasing the part is the active phase, typically requiring a small, precise movement of the robot arm to induce a peeling or shearing force that breaks the molecular bond. No external power, pneumatics, or vacuum is needed to maintain the grip, making it extremely efficient and clean.',
    },
    specifications: {
      title: "Technical Specifications",
      specs: [
        {
          metric: "Holding Force",
          value:
            "Defined by pressure (e.g., up to 7 N/cm²), dependent on surface",
        },
        {
          metric: "Surface Requirement",
          value: "Requires very smooth, clean, and flat surfaces",
        },
        {
          metric: "Material Compatibility",
          value: "Glass, polished silicon, plastic films, optical components.",
        },
        { metric: "Residue", value: "None" },
      ],
    },
    applications: {
      title: "Industrial Applications",
      description:
        "This technology is almost exclusively used in high-tech, ultra-clean environments where product integrity and lack of contamination are paramount.",
      gallery: [
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Wafer+Handling",
          alt: "Semiconductor Wafer Handling",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Solar+Panel",
          alt: "Solar Panel Assembly",
        },
        {
          src: "https://placehold.co/400x300/e2e8f0/212529?text=Optics",
          alt: "Optics Handling",
        },
      ],
      list: [
        "Semiconductor Wafer Handling: Moving fragile and extremely clean silicon wafers between processing steps without generating particles.",
        "Display Manufacturing: Handling delicate glass substrates for smartphones and televisions.",
        "Solar Panel Manufacturing: Lifting and positioning delicate photovoltaic cells without causing micro-cracks.",
        "Optics and Photonics Assembly: Assembling lenses, mirrors, and other sensitive optical components without leaving any residue.",
      ],
    },
    prosCons: {
      title: "Advantages and Disadvantages",
      pros: [
        "Extremely gentle handling, zero clamping force",
        "No power required to maintain grip",
        "Leaves zero residue or contamination",
        "Silent operation and works in a perfect vacuum",
      ],
      cons: [
        "Only works on perfectly smooth, clean, and flat surfaces",
        "Highly sensitive to dust and surface contamination",
        "Low holding force compared to other types",
        "Pad requires periodic cleaning.",
      ],
    },
    selection: {
      title: "Selection Considerations",
      points: [
        "Is the part extremely delicate or sensitive to pressure?",
        "What is the surface roughness (Ra) of the part?",
        "Is the operating environment a cleanroom?",
        "Is contamination or residue a critical concern?",
      ],
    },
  },
];

// --- UI ICONS & ILLUSTRATIONS (ENHANCED DETAIL) ---

const PneumaticGripperSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 150"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(100 75) scale(1.2)">
      <g transform="skewX(-10) translate(-90 -50)">
        <path
          d="M40,30 L140,30 L150,80 L50,80 Z"
          className="text-gray-300 dark:text-gray-600 fill-current"
          stroke="none"
        />
        <rect
          x="40"
          y="30"
          width="100"
          height="50"
          className="text-gray-400 dark:text-gray-500"
        />
        <path d="M90,30 L90,20 M110,30 L110,20" />
        <circle cx="90" cy="20" r="3" />
        <circle cx="110" cy="20" r="3" />
        <path d="M30,50 L40,50 M30,60 L40,60" className="text-blue-500" />
        <rect
          x="60"
          y="40"
          width="60"
          height="30"
          className="text-gray-400 dark:text-gray-700 fill-current opacity-30"
          stroke="none"
        />

        <path d="M50,80 L40,95 L20,95" />
        <path d="M150,80 L160,95 L180,95" />
        <rect
          x="15"
          y="92"
          width="10"
          height="6"
          className="text-blue-500 fill-current"
          stroke="none"
        />
        <rect
          x="175"
          y="92"
          width="10"
          height="6"
          className="text-blue-500 fill-current"
          stroke="none"
        />

        <line x1="75" y1="80" x2="75" y2="85" />
        <line x1="125" y1="80" x2="125" y2="85" />
        <path d="M75,85 L45,100" />
        <path d="M125,85 L155,100" />
      </g>
    </g>
  </svg>
);

const ElectricServoGripperSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 150"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(100 75) scale(1.1)">
      <g transform="skewX(-10) translate(-90 -60)">
        <path
          d="M60,20 L140,20 L150,40 L70,40 Z"
          className="text-blue-500 fill-current"
        />
        <rect
          x="60"
          y="40"
          width="80"
          height="50"
          className="text-gray-300 dark:text-gray-600"
        />
        <path d="M60,40 L70,20" />

        <rect x="80" y="50" width="40" height="30" className="opacity-20" />
        <line x1="100" y1="50" x2="100" y2="80" strokeDasharray="2 2" />

        <path d="M60,90 L50,110 L30,110" />
        <path d="M140,90 L150,110 L170,110" />

        <path
          d="M50,110 L50,100 L55,100 L55,110 Z"
          className="text-gray-400 dark:text-gray-500"
        />
        <path
          d="M150,110 L150,100 L145,100 L145,110 Z"
          className="text-gray-400 dark:text-gray-500"
        />

        <rect
          x="150"
          y="25"
          width="20"
          height="10"
          className="text-gray-400 dark:text-gray-500"
        />
      </g>
    </g>
  </svg>
);

const MagneticGripperSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 150"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(100 85)">
      <path
        d="M-40,-50 L40,-50 L50,-30 L-30,-30 Z"
        className="text-gray-300 dark:text-gray-600"
      />
      <ellipse
        cx="0"
        cy="-5"
        rx="45"
        ry="25"
        className="text-blue-500 fill-current"
      />
      <path
        d="M-50,20 L50,20 L60,40 L-40,40 Z"
        className="text-gray-500 dark:text-gray-400 fill-current"
      />

      <path d="M0,-30 L0,-60" />
      <rect x="-10" y="-70" width="20" height="10" />

      <path d="M-25,-5 Q-35,15 -30,20" className="text-blue-400 opacity-70" />
      <path d="M0,-5 Q0,18 0,20" className="text-blue-400 opacity-70" />
      <path d="M25,-5 Q35,15 30,20" className="text-blue-400 opacity-70" />
    </g>
  </svg>
);

const VacuumGripperSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 150"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(100 80)">
      <rect
        x="-10"
        y="-50"
        width="20"
        height="30"
        className="text-gray-300 dark:text-gray-600"
      />
      <path d="M0,-50 L0,-60" />
      <rect x="-5" y="-70" width="10" height="10" />
      <path
        d="M-30,-20 C-30,5 30,5 30,-20 Z"
        className="text-blue-500 fill-current opacity-30"
        stroke="currentColor"
      />
      <path
        d="M-50,20 L50,20 L55,30 L-45,30 Z"
        className="text-gray-500 dark:text-gray-400 fill-current"
      />

      <path
        d="M-15, -20 L -15, 15"
        strokeDasharray="3 3"
        className="opacity-50"
      />
      <path d="M0, -20 L 0, 15" strokeDasharray="3 3" className="opacity-50" />
      <path
        d="M15, -20 L 15, 15"
        strokeDasharray="3 3"
        className="opacity-50"
      />
    </g>
  </svg>
);

const AdhesiveGripperSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 150"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(100 80)">
      <path
        d="M-20,-50 L20,-50 L25,-40 L-25,-40 Z"
        className="text-gray-300 dark:text-gray-600"
      />
      <path d="M0,-40 L0,-60" />
      <rect x="-5" y="-70" width="10" height="10" />

      <rect
        x="-40"
        y="-30"
        width="80"
        height="15"
        rx="2"
        className="text-blue-500 fill-current"
      />

      <g className="opacity-30">
        <line x1="-35" y1="-25" x2="-35" y2="-20" />
        <line x1="-25" y1="-25" x2="-25" y2="-20" />
        <line x1="-15" y1="-25" x2="-15" y2="-20" />
        <line x1="-5" y1="-25" x2="-5" y2="-20" />
        <line x1="5" y1="-25" x2="5" y2="-20" />
        <line x1="15" y1="-25" x2="15" y2="-20" />
        <line x1="25" y1="-25" x2="25" y2="-20" />
        <line x1="35" y1="-25" x2="35" y2="-20" />
      </g>

      <path
        d="M-60,-15 L60,-15 L70,35 L-50,35 Z"
        className="text-gray-500 dark:text-gray-400 opacity-20 fill-current"
      />
    </g>
  </svg>
);

const GripperIllustration = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  switch (id) {
    case "pneumatic":
      return <PneumaticGripperSVG className={className} />;
    case "mechanical":
      return <ElectricServoGripperSVG className={className} />;
    case "magnetic":
      return <MagneticGripperSVG className={className} />;
    case "vacuum":
      return <VacuumGripperSVG className={className} />;
    case "adhesive":
      return <AdhesiveGripperSVG className={className} />;
    default:
      return <div className={`w-full h-full bg-gray-200 ${className}`} />;
  }
};

// --- UI COMPONENTS ---

function Header({
  theme,
  toggleTheme,
  onHomeClick,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
  onHomeClick: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onHomeClick}
              className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M14.5 17a2 2 0 0 1-2.5 2.1L4 16l-2 4h10l2-4" />
                <path d="m14.5 4.5 5.5 5.5" />
                <path d="m12 12 5.5 5.5" />
                <path d="M21 21l-5.5-5.5" />
                <path d="M14.5 4.5a2 2 0 0 0-2.5-2.1L4 5l-2-4h10l2 4" />
              </svg>
              RoboGrip Encyclopedia
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function GripperCard({
  gripper,
  onSelect,
}: {
  gripper: GripperData;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(gripper.id)}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
    >
      <div className="w-full h-48 overflow-hidden p-4 bg-gray-100 dark:bg-gray-900/50 group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors duration-300 flex items-center justify-center">
        <GripperIllustration
          id={gripper.id}
          className="w-full h-full text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
          {gripper.name}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {gripper.tagline}
        </p>
      </div>
    </div>
  );
}

function InfoPanel({ gripper }: { gripper: GripperData }) {
  const sectionIds = [
    "overview",
    "workingPrinciple",
    "subTypes",
    "actuation",
    "specifications",
    "applications",
    "prosCons",
    "selection",
  ];

  return (
    <div className="mt-8 lg:mt-0">
      {sectionIds.map((id) => {
        const section = gripper[id as keyof GripperData] as any;
        if (!section) return null;

        return (
          <section
            key={id}
            id={id}
            className="py-8 px-4 md:px-6 lg:px-8 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">
              {section.title}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {section.description && <p>{section.description}</p>}

              {section.items && (
                <ul className="space-y-4">
                  {section.items.map(
                    (item: { name: string; description: string }) => (
                      <li key={item.name}>
                        <strong>{item.name}:</strong> {item.description}
                      </li>
                    )
                  )}
                </ul>
              )}

              {section.specs && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Metric
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {section.specs.map(
                        (spec: { metric: string; value: string }) => (
                          <tr key={spec.metric}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {spec.metric}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {spec.value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {section.gallery && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
                    {section.gallery.map(
                      (img: { src: string; alt: string }) => (
                        <img
                          key={img.src}
                          src={img.src}
                          alt={img.alt}
                          className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                      )
                    )}
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    {section.list.map((app: string) => (
                      <li key={app}>{app}</li>
                    ))}
                  </ul>
                </>
              )}

              {section.pros && section.cons && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
                      Advantages
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {section.pros.map((pro: string) => (
                        <li key={pro}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
                      Disadvantages
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {section.cons.map((con: string) => (
                        <li key={con}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {section.points && (
                <>
                  <p className="mb-4">
                    Consider the following factors when selecting a gripper for
                    your application:
                  </p>
                  <ul className="list-decimal pl-5 space-y-2">
                    {section.points.map((point: string) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const DetailPageSideNav = ({
  gripper,
  activeSection,
}: {
  gripper: GripperData;
  activeSection: string;
}) => {
  const sectionIds: (keyof GripperData)[] = [
    "overview",
    "workingPrinciple",
    "subTypes",
    "actuation",
    "specifications",
    "applications",
    "prosCons",
    "selection",
  ];

  const sections = sectionIds
    .map((id) => {
      const sectionData = gripper[id];
      // Type guard to ensure sectionData is an object with a 'title' property
      if (typeof sectionData === "object" && "title" in sectionData) {
        return { id, title: sectionData.title };
      }
      return null;
    })
    .filter(Boolean); // Remove any null entries

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="space-y-2">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        On this page
      </h3>
      <ul className="space-y-1">
        {sections.map(
          (section) =>
            section && (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                    activeSection === section.id
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {section.title}
                </button>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

// --- PAGES ---

function HomePage({
  onSelectGripper,
}: {
  onSelectGripper: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <section className="text-center pt-12 pb-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          The Encyclopedia of
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-500 tracking-tight">
          Robotic End Effectors
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          An advanced, detailed guide to industrial robot grippers. Select a
          technology below to explore its working principles, applications, and
          specifications.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gripperData.map((gripper, index) => (
          <div
            key={gripper.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-slide-up opacity-0"
          >
            <GripperCard gripper={gripper} onSelect={onSelectGripper} />
          </div>
        ))}
      </section>
    </div>
  );
}

function DetailPage({
  gripper,
  onBack,
}: {
  gripper: GripperData;
  onBack: () => void;
}) {
  const [activeSection, setActiveSection] = useState("overview");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const sectionIds = Object.keys(gripper).filter((key) => {
      const section = gripper[key as keyof GripperData];
      return (
        typeof section === "object" && section !== null && "title" in section
      );
    });

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.current?.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.current?.unobserve(el);
      });
    };
  }, [gripper]);

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to All Grippers
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">
              {gripper.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {gripper.tagline}
            </p>
            <div className="w-full h-auto aspect-square object-cover rounded-lg shadow-xl p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <GripperIllustration
                id={gripper.id}
                className="w-full h-full text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="hidden lg:block pt-4">
              <DetailPageSideNav
                gripper={gripper}
                activeSection={activeSection}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <InfoPanel gripper={gripper} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  // State for theme management
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // State for navigation
  const [selectedGripperId, setSelectedGripperId] = useState<string | null>(
    null
  );

  // Effect to apply theme class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.scrollBehavior = "smooth";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSelectGripper = (id: string) => {
    setSelectedGripperId(id);
  };

  const handleGoHome = () => {
    setSelectedGripperId(null);
  };

  const selectedGripper = gripperData.find((g) => g.id === selectedGripperId);

  return (
    <div
      className={`bg-[#F8F9FA] dark:bg-gray-900 text-[#212529] dark:text-gray-200 min-h-screen font-sans transition-colors duration-300`}
    >
      <style>{`
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                    animation-fill-mode: forwards;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onHomeClick={handleGoHome}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {selectedGripper ? (
          <DetailPage gripper={selectedGripper} onBack={handleGoHome} />
        ) : (
          <HomePage onSelectGripper={handleSelectGripper} />
        )}
      </main>
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-800 mt-12">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} RoboGrip Encyclopedia. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}
